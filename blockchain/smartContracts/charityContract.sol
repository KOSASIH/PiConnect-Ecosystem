// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CharityContract is Ownable {
    using SafeMath for uint256;

    // Struct to represent a charity
    struct Charity {
        string id;
        string name;
        address payable wallet;
        uint256 totalDonations;
        bool isActive;
    }

    // Mapping to store charities by ID
    mapping(string => Charity) public charities;

    // Event to log donations
    event DonationReceived(address indexed donor, string indexed charityId, uint256 amount);
    event CharityAdded(string indexed charityId, string name, address wallet);
    event CharityUpdated(string indexed charityId, string name, address wallet, bool isActive);

    // Function to add a new charity
    function addCharity(string memory charityId, string memory name, address payable wallet) public onlyOwner {
        require(wallet != address(0), "Invalid wallet address");
        require(!charities[charityId].isActive, "Charity already exists");

        charities[charityId] = Charity({
            id: charityId,
            name: name,
            wallet: wallet,
            totalDonations: 0,
            isActive: true
        });

        emit CharityAdded(charityId, name, wallet);
    }

    // Function to update charity details
    function updateCharity(string memory charityId, string memory name, address payable wallet, bool isActive) public onlyOwner {
        require(charities[charityId].isActive, "Charity does not exist");

        charities[charityId].name = name;
        charities[charityId].wallet = wallet;
        charities[charityId].isActive = isActive;

        emit CharityUpdated(charityId, name, wallet, isActive);
    }

    // Function to donate to a charity
    function donate(string memory charityId) public payable {
        require(charities[charityId].isActive, "Charity is not active");
        require(msg.value > 0, "Donation must be greater than zero");

        Charity storage charity = charities[charityId];
        charity.wallet.transfer(msg.value); // Transfer funds to the charity's wallet
        charity.totalDonations = charity.totalDonations.add(msg.value); // Update total donations

        emit DonationReceived(msg.sender, charityId, msg.value);
    }

    // Function to get total donations for a charity
    function getTotalDonations(string memory charityId) public view returns (uint256) {
        require(charities[charityId].isActive, "Charity is not active");
        return charities[charityId].totalDonations;
    }

    // Function to get charity details
    function getCharity(string memory charityId) public view returns (string memory, address, uint256, bool) {
        require(charities[charityId].isActive, "Charity is not active");
        Charity memory charity = charities[charityId];
        return (charity.name, charity.wallet, charity.totalDonations, charity.isActive);
    }
}
