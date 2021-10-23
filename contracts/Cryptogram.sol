pragma solidity ^0.5.0;

contract Cryptogram {
    string public name = "Cryptogram";

    uint public imageCount = 0;
    mapping (uint => Image) public images;

    struct Image {
        uint id;
        string hash;
        string description;
        uint tipAmount;
        address payable author;
    }

    event ImageCreated (
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    event ImageTipped (
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    function uploadImage(string memory hash, string memory description) public {
        require(bytes(hash).length > 0);
        require(bytes(description).length > 0);
        require(msg.sender != address(0x0));

        imageCount++;

        images[imageCount] = Image(imageCount, hash, description, 0, msg.sender);

        emit ImageCreated(imageCount, hash, description, 0, msg.sender);
    }

    function tipImageOwner(uint id) public payable {
        require(id > 0 && id <= imageCount);

        Image memory image = images[id];

        address payable author = image.author;
        address(author).transfer(msg.value);

        image.tipAmount = image.tipAmount = msg.value;
        images[id] = image;

        emit ImageTipped(id, image.hash, image.description, image.tipAmount, author);
    }
}
