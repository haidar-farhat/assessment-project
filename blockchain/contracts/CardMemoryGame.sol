// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CardMemoryGame {
    struct Result {
        address player;
        uint256 score;
        uint256 timestamp;
    }

    // Mapping from player address to their best result
    mapping(address => Result) public bestResults;
    // Array of top results for leaderboard
    Result[] public leaderboard;
    // Max leaderboard size
    uint256 public constant LEADERBOARD_SIZE = 10;

    // Event for new result
    event NewResult(address indexed player, uint256 score, uint256 timestamp);

    // Submit a new score
    function submitScore(uint256 score) external {
        require(score > 0, "Score must be positive");
        uint256 nowTime = block.timestamp;
        Result memory newResult = Result(msg.sender, score, nowTime);

        // Update best result if this score is higher
        if (score > bestResults[msg.sender].score) {
            bestResults[msg.sender] = newResult;
            _updateLeaderboard(newResult);
            emit NewResult(msg.sender, score, nowTime);
        }
    }

    // Internal: update leaderboard with new result
    function _updateLeaderboard(Result memory newResult) internal {
        // Insert in sorted order (descending by score)
        uint256 insertIndex = leaderboard.length;
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (newResult.score > leaderboard[i].score) {
                insertIndex = i;
                break;
            }
        }
        if (insertIndex < LEADERBOARD_SIZE) {
            leaderboard.push(newResult); // expand array
            for (uint256 j = leaderboard.length - 1; j > insertIndex; j--) {
                leaderboard[j] = leaderboard[j - 1];
            }
            leaderboard[insertIndex] = newResult;
            // Trim if over size
            if (leaderboard.length > LEADERBOARD_SIZE) {
                leaderboard.pop();
            }
        } else if (leaderboard.length < LEADERBOARD_SIZE) {
            leaderboard.push(newResult);
        }
    }

    // Get leaderboard (top N)
    function getLeaderboard() external view returns (Result[] memory) {
        return leaderboard;
    }
} 