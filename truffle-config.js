module.exports = {
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    contracts_build_directory: './build/contracts/',
    contracts_directory: './contracts/',
    migrations_directory: "./build/migrations",
    networks: {
        development: {
            host: '127.0.0.1',
            network_id: '*',
            port: 7545,
        },
    },
    test_directory: './tests',
}
