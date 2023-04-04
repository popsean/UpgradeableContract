const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying My Contract with account:", deployer)

  const proxyOptions = {
    proxyContract: "TransparentUpgradeableProxy",
    viaAdminContract: "ProxyAdmin",
    execute: {
      init: {
        methodName: "initialize",
        args: [1],
      },
    },
  }

  const myContract = await deploy("StandardImplV2", {
    contract: "StandardImplV2",
    from: deployer,
    proxy: proxyOptions,
    args: [],
    log: true,
  })

  log("Proxy deployed to:", myContract.address)
  log("Implementation deployed to:", myContract.implementation)
}
module.exports.tags = ["all", "StandardImplV2"]
