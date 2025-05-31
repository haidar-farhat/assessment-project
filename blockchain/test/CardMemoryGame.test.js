const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("CardMemoryGame", function () {
  let game, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Game = await ethers.getContractFactory("CardMemoryGame");
    game = await Game.deploy();
  });

  it("should deploy and have empty leaderboard", async function () {
    expect(await game.getLeaderboard()).to.be.an("array").that.is.empty;
  });

  it("should not allow zero or negative scores", async function () {
    await expect(game.connect(addr1).submitScore(0)).to.be.revertedWith("Score must be positive");
  });

  it("should accept valid scores and update best result", async function () {
    await game.connect(addr1).submitScore(42);
    const result = await game.bestResults(addr1.address);
    expect(result.score).to.equal(42);
    expect(result.player).to.equal(addr1.address);
    expect(result.timestamp).to.be.gt(0);
  });

  it("should only update best result if new score is higher", async function () {
    await game.connect(addr1).submitScore(10);
    await game.connect(addr1).submitScore(5);
    let result = await game.bestResults(addr1.address);
    expect(result.score).to.equal(10);
    await game.connect(addr1).submitScore(20);
    result = await game.bestResults(addr1.address);
    expect(result.score).to.equal(20);
  });

  it("should emit NewResult event on new best score", async function () {
    await expect(game.connect(addr1).submitScore(50))
      .to.emit(game, "NewResult")
      .withArgs(addr1.address, 50, anyValue);
  });

  it("should maintain a sorted leaderboard of top scores", async function () {
    // Submit scores from multiple addresses
    await game.connect(addr1).submitScore(10);
    await game.connect(addr2).submitScore(20);
    await game.connect(owner).submitScore(15);
    const leaderboard = await game.getLeaderboard();
    expect(leaderboard.length).to.equal(3);
    expect(leaderboard[0].score).to.equal(20);
    expect(leaderboard[1].score).to.equal(15);
    expect(leaderboard[2].score).to.equal(10);
  });

  it("should keep only the top 10 scores in the leaderboard", async function () {
    for (let i = 1; i <= 12; i++) {
      const [signer] = await ethers.getSigners();
      await game.connect(signer).submitScore(i * 10);
    }
    const leaderboard = await game.getLeaderboard();
    expect(leaderboard.length).to.equal(10);
    // Top score should be 120, lowest should be 30
    expect(leaderboard[0].score).to.equal(120);
    expect(leaderboard[9].score).to.equal(30);
  });
}); 