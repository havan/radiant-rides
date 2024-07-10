require("@nomicfoundation/hardhat-toolbox");

// TASKS
require("./tasks/mint");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    columbus: {
      url: vars.get(
        "COLUMBUS_URL",
        "https://columbus.camino.network/ext/bc/C/rpc",
      ),
      accounts: vars.has("COLUMBUS_DEPLOYER_PRIVATE_KEY")
        ? [vars.get("COLUMBUS_DEPLOYER_PRIVATE_KEY")]
        : [],
    },
    camino: {
      url: vars.get("CAMINO_URL", "https://api.camino.network/ext/bc/C/rpc"),
      accounts: vars.has("CAMINO_DEPLOYER_PRIVATE_KEY")
        ? [vars.get("CAMINO_DEPLOYER_PRIVATE_KEY")]
        : [],
    },
  },
  etherscan: {
    apiKey: {
      columbus: "abc",
    },
    customChains: [
      {
        network: "columbus",
        chainId: 501,
        urls: {
          apiURL: "https://columbus.caminoscan.com/api",
          browserURL: "https://columbus.caminoscan.com",
        },
      },
    ],
  },
};
