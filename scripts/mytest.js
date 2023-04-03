// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const utils = hre.ethers.utils

async function main() {
  testIMPL_SLOT()
}

function testIMPL_SLOT() {
  // bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1)
  const keccak256String = utils.keccak256(
    utils.toUtf8Bytes("eip1967.proxy.implementation")
  )
  console.log("keccak256: " + keccak256String)

  const impl_slot = hre.ethers.BigNumber.from(keccak256String)
    .sub(1)
    .toHexString()
  console.log("impl_slot address: " + impl_slot)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
