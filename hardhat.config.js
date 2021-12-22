require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const fs = require("fs");
const envFile = __dirname + "/.env";
const env = JSON.parse(fs.readFileSync(envFile));

const ALCHEMY_API_KEY = env.ALCHEMY_API_KEY;
const ROPSTEN_PRIVATE_KEY = env.ROPSTEN_PRIVATE_KEY;

task("env", "Prints the list of env values", async (taskArgs, hre) => {
  console.log('ALCHEMY_API_KEY', ALCHEMY_API_KEY);
  console.log('ROPSTEN_PRIVATE_KEY', ROPSTEN_PRIVATE_KEY);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
