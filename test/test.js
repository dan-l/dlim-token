const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DlimToken1", function () {
  let Token;
  let dlim1Token;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Dlim1Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    dlim1Token = await Token.deploy();
    await dlim1Token.deployed();
  });

  describe("Deployment ", async function () {
    it("Should set the right name and symbol", async function () {
      expect(await dlim1Token.name()).to.equal("Dlim1Token");
      expect(await dlim1Token.symbol()).to.equal("DLIM1");
    });

    it("Should setup supply for the account owner", async function () {
      expect(await dlim1Token.balanceOf(owner.getAddress())).to.equal(1000);
    });

    it("Should setup the right decimals", async function () {
      expect(await dlim1Token.decimals()).to.equal(5);
    });
  });

  describe("Transactions", function () {

    it("Should transfer correctly between accounts", async function () {
      await dlim1Token.transfer(addr1.getAddress(), 50);
      expect(await dlim1Token.balanceOf(owner.getAddress())).to.equal(950);
      expect(await dlim1Token.balanceOf(addr1.getAddress())).to.equal(50);
    });


    it("Should fail if sender doesn’t have enough tokens", async function () {
      const ownerBalance = await dlim1Token.balanceOf(owner.getAddress());

      await expect(dlim1Token.connect(addr1).transfer(owner.getAddress(), 1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await dlim1Token.balanceOf(owner.getAddress())).to.equal(ownerBalance);
    });


    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await dlim1Token.balanceOf(owner.getAddress());

      await dlim1Token.transfer(addr1.getAddress(), 50);
      await dlim1Token.transfer(addr2.getAddress(), 30);

      expect(await dlim1Token.balanceOf(owner.getAddress())).to.equal(initialOwnerBalance - 50 - 30);
      expect(await dlim1Token.balanceOf(addr1.getAddress())).to.equal(50);
      expect(await dlim1Token.balanceOf(addr2.getAddress())).to.equal(30);
    });

  });
});
