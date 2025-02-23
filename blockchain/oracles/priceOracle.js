const axios = require('axios');
const { EventEmitter } = require('events');

class PriceOracle extends EventEmitter {
    constructor(apiUrl, assetSymbol) {
        super();
        this.apiUrl = apiUrl;
        this.assetSymbol = assetSymbol;
        this.currentPrice = 0;
        this.updateInterval = 60000; // Update every minute
        this.startPriceFeed();
    }

    // Function to fetch the latest price from the API
    async fetchPrice() {
        try {
            const response = await axios.get(this.apiUrl);
            const price = this.extractPrice(response.data);
            this.currentPrice = price;
            this.emit('priceUpdated', price); // Emit event when price is updated
        } catch (error) {
            console.error('Error fetching price:', error.message);
        }
    }

    // Function to extract the price from the API response
    extractPrice(data) {
        // Assuming the API returns a JSON object with a 'price' field
        // Modify this according to the actual API response structure
        return data.price;
    }

    // Function to start the price feed
    startPriceFeed() {
        this.fetchPrice(); // Initial fetch
        setInterval(() => {
            this.fetchPrice();
        }, this.updateInterval);
    }

    // Function to get the current price
    getCurrentPrice() {
        return this.currentPrice;
    }
}

// Example usage
const priceOracle = new PriceOracle('https://api.example.com/price', 'ETH');

priceOracle.on('priceUpdated', (newPrice) => {
    console.log(`New price for ${priceOracle.assetSymbol}: $${newPrice}`);
});

// Export the PriceOracle class
module.exports = PriceOracle;
