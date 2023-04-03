const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")

describe("StandardImpl", async function () {
  let standardImpl, factory
  let deployer

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer
    // factory = await ethers.getContractFactory("StandardImpl")
    // standardImpl = await factory.deploy()
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("StandardImpl", deployer)
  })

  it("Should start with a value of 0", async function () {
    const curVal = await standardImpl.s_value()
    const expectedVal = "0"
    assert.equal(curVal.toString(), expectedVal)
  })

  it("Fails if first init failed", async function () {
    const expectedVal = "7"
    const transactionResponse = await standardImpl.initialize(expectedVal)
    await transactionResponse.wait(1)

    const currentValue = await standardImpl.s_value()
    assert.equal(currentValue.toString(), expectedVal)
  })

  it("Fails if init more than once", async function () {
    await standardImpl.initialize("0")

    await expect(standardImpl.initialize("1")).to.be.revertedWith(
      //   "Only initialize once!"
      "Initializable: contract is already initialized"
    )
  })

  it("Fails if don't set Value success", async function () {
    const expectedVal = "10"
    const transactionResponse = await standardImpl.setValue(expectedVal)
    await transactionResponse.wait(1)

    const currentValue = await standardImpl.s_value()
    assert.equal(currentValue.sub(10).toString(), expectedVal)
  })
})
