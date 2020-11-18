// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Formation is Ownable {
    uint256 private constant _DURATION = 6 * 4 weeks;
    string private _message;
    uint256 private _startDate;

    constructor(address owner, string memory message) public {
        _message = message;
        _startDate = now;
        transferOwnership(owner);
    }

    function getStartDate() public view returns (uint256) {
        return _startDate;
    }

    function setMessage(string memory message) public onlyOwner() {
        _message = message;
    }

    function getMessage() public view returns (string memory) {
        return _message;
    }

    function goodbye() public view returns (string memory) {
        if (now >= _startDate + _DURATION) {
            return "congratulations and goodbye!!";
        } else {
            return "not finished yet!!";
        }
    }
}
