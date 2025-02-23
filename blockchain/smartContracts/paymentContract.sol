// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PaymentContract is Ownable {
    using SafeMath for uint256;

    // Event to log payments
    event PaymentReceived(address indexed donor, uint256 amount, string charityId);
    event Withdrawal(address indexed to, uint256 amount);

    // Mapping to track total donations per charity
    mapping(string => uint256) public charityDonations;

    // Function to receive payments
    receive() external payable {
        require(msg.value > 0, "Payment must be greater than zero");
        emit PaymentReceived(msg.sender, msg.value, "default"); // Default charity ID
    }

    // Function to donate to a specific charity
    function donate(string memory charityId) public payable {
        require(msg.value > 0, "Donation must be greater than zero");
        charityDonations[charityId] = charityDonations[charityId].add(msg.value);
        emit PaymentReceived(msg.sender, msg.value, charityId);
    }

    // Function to withdraw funds to a specified address
    function withdraw(address payable to, uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
        emit Withdrawal(to, amount);
    }

    // Function to get the total donations for a specific charity
    function getTotalDonations(string memory charityId) public view returns (uint256) {
        return charityDonations[charityId];
    }

    // Function to get the contract's balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
