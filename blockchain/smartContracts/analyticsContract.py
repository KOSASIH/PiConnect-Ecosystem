// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AnalyticsContract is Ownable {
    using SafeMath for uint256;

    // Struct to represent donation analytics
    struct DonationData {
        uint256 totalDonations;
        uint256 donationCount;
    }

    // Mapping to store analytics data for each charity
    mapping(string => DonationData) private charityAnalytics;

    // Mapping to store analytics data for each user
    mapping(address => DonationData) private userAnalytics;

    // Event to log donations for analytics
    event DonationLogged(address indexed donor, string indexed charityId, uint256 amount);

    // Function to log a donation
    function logDonation(address donor, string memory charityId, uint256 amount) external onlyOwner {
        require(amount > 0, "Donation must be greater than zero");

        // Update charity analytics
        charityAnalytics[charityId].totalDonations = charityAnalytics[charityId].totalDonations.add(amount);
        charityAnalytics[charityId].donationCount = charityAnalytics[charityId].donationCount.add(1);

        // Update user analytics
        userAnalytics[donor].totalDonations = userAnalytics[donor].totalDonations.add(amount);
        userAnalytics[donor].donationCount = userAnalytics[donor].donationCount.add(1);

        emit DonationLogged(donor, charityId, amount);
    }

    // Function to get total donations for a charity
    function getCharityAnalytics(string memory charityId) public view returns (uint256 totalDonations, uint256 donationCount) {
        DonationData memory data = charityAnalytics[charityId];
        return (data.totalDonations, data.donationCount);
    }

    // Function to get total donations for a user
    function getUser Analytics(address user) public view returns (uint256 totalDonations, uint256 donationCount) {
        DonationData memory data = userAnalytics[user];
        return (data.totalDonations, data.donationCount);
    }
}
