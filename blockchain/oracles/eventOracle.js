const axios = require('axios');
const { EventEmitter } = require('events');

class EventOracle extends EventEmitter {
    constructor(apiUrl) {
        super();
        this.apiUrl = apiUrl;
        this.events = [];
        this.updateInterval = 30000; // Update every 30 seconds
        this.startEventFeed();
    }

    // Function to fetch the latest events from the API
    async fetchEvents() {
        try {
            const response = await axios.get(this.apiUrl);
            const newEvents = this.extractEvents(response.data);
            this.processEvents(newEvents);
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    }

    // Function to extract events from the API response
    extractEvents(data) {
        // Assuming the API returns a JSON object with an 'events' array
        // Modify this according to the actual API response structure
        return data.events || [];
    }

    // Function to process new events
    processEvents(newEvents) {
        newEvents.forEach(event => {
            if (!this.events.includes(event.id)) { // Check for duplicates
                this.events.push(event.id);
                this.emit('eventReceived', event); // Emit event when a new event is received
            }
        });
    }

    // Function to start the event feed
    startEventFeed() {
        this.fetchEvents(); // Initial fetch
        setInterval(() => {
            this.fetchEvents();
        }, this.updateInterval);
    }
}

// Example usage
const eventOracle = new EventOracle('https://api.example.com/events');

eventOracle.on('eventReceived', (event) => {
    console.log(`New event received: ${JSON.stringify(event)}`);
    // Here you can add logic to interact with your blockchain smart contracts
});

// Export the EventOracle class
module.exports = EventOracle;
