const Cryptogram = artifacts.require('./Cryptogram.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Cryptogram', ([, author, tipper]) => {
    let cryptogram

    before(async () => {
        cryptogram = await Cryptogram.deployed()
    })

    describe('after deployment', () => {
        it('has deployed successfully', async () => {
            const address = await cryptogram.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await cryptogram.name()

            assert.equal(name, 'Cryptogram')
        })

        it('has image count at 0', async () => {
            const count = await cryptogram.imageCount()

            assert.equal(count, 0)
        })
    })

    describe('images logic', () => {
        const data = {
            description: 'This is a description',
            hash: 'oisijoiasjfioasjdfioasdjfoiasdjfoasidjfasidfasif1231',
        }

        let result
        let imageCount

        before(async () => {
            result = await cryptogram.uploadImage(data.hash, data.description, { from: author })
            imageCount = await cryptogram.imageCount()
        })

        it('should create image', () => {
            const event = result.logs[0].args

            assert.equal(imageCount, 1)
            assert.equal(Number(event.id), Number(imageCount), 'ID is correct')
            assert.equal(event.hash, data.hash, 'Hashes match')
            assert.equal(event.description, data.description, 'Descriptions match')
            assert.equal(event.tipAmount, 0, 'Tip amounts matches')
            assert.equal(event.author, author, 'Authors match')
        })

        it('should retrieve image', async () => {
            const image = await cryptogram.images(imageCount)

            assert.equal(Number(image.id), Number(imageCount), 'ID is correct')
            assert.equal(image.hash, data.hash, 'Hashes match')
            assert.equal(image.description, data.description, 'Descriptions match')
            assert.equal(image.tipAmount, 0, 'Tip amounts matches')
            assert.equal(image.author, author, 'Authors match')
        })

        it('should fail in no hash provided', async () => {
            await cryptogram.uploadImage('', data.description, { from: author }).should.be.rejected
        })

        it('should fail in no description provided', async () => {
            await cryptogram.uploadImage(data.hash, '', { from: author }).should.be.rejected
        })

        it('should fail if invalid author provided', async () => {
            await cryptogram.uploadImage(data.hash, data.description, { from: 'test' }).should.be.rejected
        })
    })

    describe('tipping logic', () => {
        const data = {
            description: 'This is a description',
            hash: 'oisijoiasjfioasjdfioasdjfoiasdjfoasidjfasidfasif1231',
        }

        let currentAuthorBalance
        let imageCount
        let result

        before(async () => {
            currentAuthorBalance = new web3.utils.BN(await web3.eth.getBalance(author))
            imageCount = await cryptogram.imageCount()
            result = await cryptogram.tipImageOwner(imageCount, {
                from: tipper,
                value: web3.utils.toWei('1', 'Ether'),
            })
        })

        it('should tip correctly', () => {
            const event = result.logs[0].args

            assert.equal(Number(event.id), Number(imageCount), 'ID is correct')
            assert.equal(event.hash, data.hash, 'Hash is correct')
            assert.equal(event.description, data.description, 'Description is correct')
            assert.equal(event.tipAmount, '1000000000000000000', 'Tip amount is correct')
            assert.equal(event.author, author, 'Author is correct')
        })

        it('should credit author balance', async () => {
            const updatedAuthorBalance = new web3.utils.BN(await web3.eth.getBalance(author))
            const sentTipAmount = new web3.utils.BN(web3.utils.toWei('1', 'Ether'))

            const expectedAuthorBalance = currentAuthorBalance.add(sentTipAmount)

            assert.equal(String(updatedAuthorBalance), String(expectedAuthorBalance))
        })

        it('should fail if tipping non existant image', async () => {
            await cryptogram.tipImageOwner(
                99,
                {
                    from: tipper,
                    value: web3.utils.toWei('1', 'Ether'),
                }
            ).should.be.rejected
        })
    })
})
