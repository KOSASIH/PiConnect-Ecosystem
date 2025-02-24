// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityContract {
    struct Member {
        address memberAddress;
        string name;
        uint256 contributions;
        bool isActive;
    }

    struct Event {
        string title;
        string description;
        uint256 date;
        address organizer;
        bool isActive;
    }

    mapping(address => Member) public members; // Mapping of member address to Member
    mapping(uint256 => Event) public events; // Mapping of event ID to Event
    uint256 public eventCount; // Counter for the number of events

    event MemberJoined(address indexed memberAddress, string name);
    event MemberUpdated(address indexed memberAddress, string name, bool isActive);
    event EventCreated(uint256 indexed eventId, string title, address indexed organizer);
    event EventUpdated(uint256 indexed eventId, string title, bool isActive);

    modifier onlyActiveMember() {
        require(members[msg.sender].isActive, "Not an active member");
        _;
    }

    // Function to join the community
    function joinCommunity(string memory name) public {
        require(members[msg.sender].memberAddress == address(0), "Already a member");
        members[msg.sender] = Member(msg.sender, name, 0, true);
        emit MemberJoined(msg.sender, name);
    }

    // Function to update member details
    function updateMember(string memory name, bool isActive) public onlyActiveMember {
        Member storage member = members[msg.sender];
        member.name = name;
        member.isActive = isActive;
        emit MemberUpdated(msg.sender, name, isActive);
    }

    // Function to create a new event
    function createEvent(string memory title, string memory description, uint256 date) public onlyActiveMember {
        eventCount++;
        events[eventCount] = Event(title, description, date, msg.sender, true);
        emit EventCreated(eventCount, title, msg.sender);
    }

    // Function to update an existing event
    function updateEvent(uint256 eventId, string memory title, bool isActive) public {
        Event storage eventDetail = events[eventId];
        require(msg.sender == eventDetail.organizer, "Not the event organizer");
        eventDetail.title = title;
        eventDetail.isActive = isActive;
        emit EventUpdated(eventId, title, isActive);
    }

    // Function to get member details
    function getMember(address memberAddress) public view returns (string memory name, uint256 contributions, bool isActive) {
        Member memory member = members[memberAddress];
        return (member.name, member.contributions, member.isActive);
    }

    // Function to get event details
    function getEvent(uint256 eventId) public view returns (string memory title, string memory description, uint256 date, address organizer, bool isActive) {
        Event memory eventDetail = events[eventId];
        return (eventDetail.title, eventDetail.description, eventDetail.date, eventDetail.organizer, eventDetail.isActive);
    }
}
