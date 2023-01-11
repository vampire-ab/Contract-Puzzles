const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const [owner, addr1] = await ethers.getSigners();
    await game.connect(addr1).write(owner.address);
    await game.connect(owner).win(addr1.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
