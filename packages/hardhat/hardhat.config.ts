import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import '@openzeppelin/hardhat-upgrades';
import "hardhat-ethernal";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address, ':' , hre.ethers.utils.formatEther(await account.getBalance()), 'eth');
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  ethernal: {
    email: process.env.ETHERNAL_EMAIL || "",
    password: process.env.ETHERNAL_PASSWORD || "",
    disableSync: false,
    disableTrace: false,
    uploadAst: false,
    disabled: false,
    resetOnStart: "CoffeeChat"
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
    only: [],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: "../frontend/typechain",
  },
  networks: {
    // mainnets
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_API_KEY ?? ""
        }`,
      accounts:
        process.env.POLYGON_PRIVATE_KEY !== undefined
          ? [process.env.POLYGON_PRIVATE_KEY]
          : [],
    },
    // testnets
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.POLYGON_MUMBAI_API_KEY ?? ""
        }`,
      accounts:
        process.env.POLYGON_MUMBAI_PRIVATE_KEY !== undefined
          ? [process.env.POLYGON_MUMBAI_PRIVATE_KEY]
          : [],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY ?? ""
        }`,
      accounts:
        process.env.RINKEBY_PRIVATE_KEY !== undefined
          ? [process.env.RINKEBY_PRIVATE_KEY]
          : [],
    },

    // devnets
    hardhat: {
      mining: {
        auto: !(process.env.HARDHAT_DISABLE_AUTO_MINING === "true"),
        interval: [100, 3000],
      },
      chainId: 1337
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGON_API_KEY || "",
      rinkeby: process.env.RINKEBY_API_KEY || ""
    }
  },
};



export default config;
