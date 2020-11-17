// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/math/SafeMath.sol";
pragma solidity ^0.6.0;

contract Calc {
    using SafeMath for uint256;

    constructor() public {

    }

    function add (uint256 a, uint256 b)public  pure returns (uint256){
       return  a.add(b);
    }

    function sub (uint256 a, uint256 b) public pure returns (uint256){
        return a.sub(b, "Calc: overflow");
    }

    function mul (uint256 a, uint256 b) public pure returns (uint256) {
        return a.mul(b);
    }

    function div (uint256 a, uint256 b) public pure returns (uint256) {
        return a.div(b);
    }

}
