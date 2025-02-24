// communityEngagementAnalysis.js

// Sample data structure for community members and events
const members = [
    { id: 1, name: 'Alice', contributions: 5, isActive: true },
    { id: 2, name: 'Bob', contributions: 3, isActive: true },
    { id: 3, name: 'Charlie', contributions: 0, isActive: false },
];

const events = [
    { id: 1, title: 'Community Meetup', participants: [1, 2], date: '2023-10-01' },
    { id: 2, title: 'Online Workshop', participants: [1], date: '2023-10-15' },
    { id: 3, title: 'Charity Event', participants: [], date: '2023-10-20' },
];

/**
 * Calculate the total number of active members in the community.
 * @returns {number} The count of active members.
 */
function getActiveMemberCount() {
    return members.filter(member => member.isActive).length;
}

/**
 * Calculate the total contributions made by all members.
 * @returns {number} The total contributions.
 */
function getTotalContributions() {
    return members.reduce((total, member) => total + member.contributions, 0);
}

/**
 * Calculate the participation rate for events.
 * @returns {Object} An object containing event participation rates.
 */
function getEventParticipationRates() {
    const participationRates = events.map(event => {
        const totalParticipants = event.participants.length;
        const participationRate = totalParticipants / members.length; // Assuming all members can participate
        return {
            eventId: event.id,
            title: event.title,
            participationRate: participationRate,
        };
    });
    return participationRates;
}

/**
 * Get a summary of community engagement metrics.
 * @returns {Object} An object containing various engagement metrics.
 */
function getEngagementSummary() {
    const activeMemberCount = getActiveMemberCount();
    const totalContributions = getTotalContributions();
    const eventParticipationRates = getEventParticipationRates();

    return {
        activeMemberCount,
        totalContributions,
        eventParticipationRates,
    };
}

// Example usage
const engagementSummary = getEngagementSummary();
console.log('Community Engagement Summary:', engagementSummary);

module.exports = {
    getActiveMemberCount,
    getTotalContributions,
    getEventParticipationRates,
    getEngagementSummary,
};
