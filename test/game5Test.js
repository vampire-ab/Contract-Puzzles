const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck    
    while (true) {
      const signer = await ethers.Wallet.createRandom().connect(ethers.provider);
      const address = await signer.getAddress();
      console.log(address);
      if (address < "0x00f") {
        const accounts = await ethers.provider.getSigner(0);        
        await accounts.sendTransaction({
          to: address,
          value: ethers.utils.parseEther("1.0"),
        });
        await game.connect(signer).win();
        break;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
