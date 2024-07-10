const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("RadiantRides", function () {
  async function deployRadiantRidesFixture() {
    const [defaultAdmin, toAccount, minter] = await ethers.getSigners();

    const NAME = "RadiantRides";
    const SYMBOL = "SunnyCars";
    const TOKEN_URI =
      "https://brooq6xsyzi4f4zijqnrgswizginuq5vtd3hmtfeeu3zmzmj346a.arweave.net/DFzoevLGUcLzKEwbE0rIyZDaQ7WY9nZMpCU3lmWJ3zw";

    const RadiantRides = await ethers.getContractFactory("RadiantRides");
    const radiantRides = await RadiantRides.deploy(NAME, SYMBOL, TOKEN_URI);

    radiantRides.grantRole(await radiantRides.MINTER_ROLE(), minter.address);

    return {
      radiantRides,
      defaultAdmin,
      toAccount,
      minter,
      TOKEN_URI,
    };
  }

  describe("Deployment", function () {
    it("should deploy correctly with the right name and symbol", async function () {
      const { radiantRides } = await loadFixture(deployRadiantRidesFixture);

      expect(await radiantRides.name()).to.equal("RadiantRides");
      expect(await radiantRides.symbol()).to.equal("SunnyCars");
    });
  });

  describe("Minting", function () {
    it("should mint all 33 NFTs to the specified address", async function () {
      const { radiantRides, toAccount, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      await radiantRides.mintAll(toAccount.address);

      expect(await radiantRides.totalMinted()).to.equal(33);

      for (let i = 1; i <= 33; i++) {
        expect(await radiantRides.ownerOf(i)).to.equal(toAccount.address);
        expect(await radiantRides.tokenURI(i)).to.equal(TOKEN_URI);
      }
    });

    it("should not allow mintAll more than once", async function () {
      const { radiantRides, toAccount, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      await radiantRides.mintAll(toAccount.address);

      await expect(radiantRides.mintAll(toAccount.address)).to.be.revertedWith(
        "NFTs already minted",
      );
    });

    it("should allow minting single NFT", async function () {
      const { radiantRides, toAccount, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      expect(await radiantRides.mint(toAccount.address, 1));
    });

    it("should allow MINTER_ROLE to mint", async function () {
      const { radiantRides, toAccount, minter, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      expect(await radiantRides.connect(minter).mintAll(toAccount.address));

      expect(await radiantRides.totalMinted()).to.equal(33);
    });

    it("should not allow minting more than 33 NFTs", async function () {
      const { radiantRides, toAccount, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      for (let i = 1; i <= 33; i++) {
        expect(await radiantRides.mint(toAccount.address, i));
      }

      await expect(radiantRides.mint(toAccount.address, 34)).to.be.revertedWith(
        "Max supply reached",
      );
    });

    it("should not allow non-MINTER_ROLE to mint", async function () {
      const { radiantRides, toAccount, TOKEN_URI } = await loadFixture(
        deployRadiantRidesFixture,
      );

      const minterRole = await radiantRides.MINTER_ROLE();

      await expect(radiantRides.connect(toAccount).mintAll(toAccount.address))
        .to.be.revertedWithCustomError(
          radiantRides,
          "AccessControlUnauthorizedAccount",
        )
        .withArgs(toAccount.address, minterRole);
    });
  });
});
