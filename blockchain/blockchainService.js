const Web3 = require('web3');
const { Transaction } = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_NODE_URL));

// Smart contract ABI and address
const contractABI = [ /* ABI array */ ];
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to get the balance of an address
async function getBalance(address) {
    try {
        const balance = await contract.methods.balanceOf(address).call();
        return web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
    } catch (error) {
        console.error('Error fetching balance:', error.message);
        throw new Error('Failed to fetch balance. Please try again later.');
    }
}

// Function to send a transaction
async function sendTransaction(fromAddress, toAddress, amount, privateKey) {
    try {
        const gasPrice = await web3.eth.getGasPrice(); // Get current gas price
        const nonce = await web3.eth.getTransactionCount(fromAddress); // Get nonce

        const tx = {
            nonce: web3.utils.toHex(nonce),
            gasLimit: web3.utils.toHex(21000), // Set gas limit
            gasPrice: web3.utils.toHex(gasPrice),
            to: toAddress,
            value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
        };

        const common = Common.forCustomChain(
            'mainnet',
            {
                name: 'custom',
                networkId: 1,
                chainId: 1,
            },
            'petersburg'
        );

        const transaction = new Transaction(tx, { chain: 'mainnet', hardfork: 'petersburg' });
        const privateKeyBuffer = Buffer.from(privateKey, 'hex');
        transaction.sign(privateKeyBuffer);

        const serializedTx = transaction.serialize();
        const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        return receipt;
    } catch (error) {
        console.error('Error sending transaction:', error.message);
        throw new Error('Transaction failed. Please check your details and try again.');
    }
}

// Function to listen for events from the smart contract
function listenForEvents() {
    contract.events.Transfer({
        filter: { from: '0xYourAddress' }, // Filter for specific address
        fromBlock: 'latest'
    })
    .on('data', event => {
        console.log('Transfer event detected:', event);
    })
    .on('error', error => {
        console.error('Error listening for events:', error.message);
    });
}

// Function to monitor transaction status
async function monitorTransaction(txHash) {
    try {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        if (receipt) {
            return receipt;
        } else {
            throw new Error('Transaction not found. It may still be pending.');
        }
    } catch (error) {
        console.error('Error monitoring transaction:', error.message);
        throw new Error('Failed to monitor transaction. Please try again later.');
    }
}

// Export functions
module.exports = {
    getBalance,
    sendTransaction,
    listenForEvents,
    monitorTransaction,
};
