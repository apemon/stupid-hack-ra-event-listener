const Web3 = require("web3");
const abi = require("./api.json"); // abi from etherscan

// web3 config
const web3 = new Web3(process.env.PROVIDER);
const contractAddress = process.env.CONTACT_ADDRESS;
const subscription = new web3.eth.Contract(abi, contractAddress);

module.exports = subscription;
