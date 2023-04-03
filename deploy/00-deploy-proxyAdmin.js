const { network } = require("hardhat")

console.log("in 00 deploy...")
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("==>Deploying ProxyAdmin with account:", deployer)

  const proxyAdmin = await deploy("ProxyAdmin", {
    contract: "ProxyAdmin",
    from: deployer,
    args: [],
    log: true,
  })
  log("==>ProxyAdmin deployed to:", proxyAdmin.address)
}
module.exports.tags = ["all", "ProxyAdmin"]
