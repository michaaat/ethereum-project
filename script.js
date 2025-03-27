//this uses infura.io, and I think there is no quicknode.eth on Holesky and Sepolia

// Import the required library
const { ethers } = require("ethers");

// Function to fetch the Ethereum data
async function fetchEthereumData(rpcUrl, ensName) {
    try {
        // Connect to the Ethereum network
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        console.log("Connected to ${rpcUrl}");

        // Resolve the ENS name to an Ethereum address
        const address = await provider.resolveName(ensName);
        if (!address) {
            console.error("ENS not found: ${ensName}");
            return;
        }
        console.log("ENS Address for ${ensName}: ${address}");

        // Fetch the latest block number
        const latestBlock = await provider.getBlockNumber();
        console.log("Latest Block Number: ${latestBlock}");

        // Fetch the account balance and format it to Ether
        const balance = await provider.getBalance(address, latestBlock);
        console.log("Raw Balance for ${address}: ${balance}");
        
        // Correctly format the balance using ethers v6 formatEther
        const balanceEth = ethers.formatEther(balance);
        console.log("Formatted Balance for ${address}: ${balanceEth} ETH");

        // Fetch the transaction count
        const txCount = await provider.getTransactionCount(address);
        console.log("Transaction Count for ${address}: ${txCount}");
    } catch (error) {
        console.error("Error: ${error.message}");
    }
}

// Main function
async function main() {
    const ensName = "quicknode.eth"; // The ENS name to resolve

    // RPC URLs for Ethereum Mainnet, Holesky, and Sepolia
    const networks = {
        Mainnet: "https://mainnet.infura.io/v3/e2905ece01854f4e9e6c4c5b3980dea7",
        Holesky: "https://holesky.infura.io/v3/e2905ece01854f4e9e6c4c5b3980dea7",
        Sepolia: "https://sepolia.infura.io/v3/e2905ece01854f4e9e6c4c5b3980dea7"
    };

    for (const [networkName, rpcUrl] of Object.entries(networks)) {
        console.log(`\nConnecting to ${networkName}...`);
        await fetchEthereumData(rpcUrl, ensName, networkName);
    }
}

// Execute the main function
main();