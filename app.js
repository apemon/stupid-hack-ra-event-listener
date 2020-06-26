require("dotenv").config();
const { sqlBuilder } = require("./utils");
const conn = require("./mysql");

const Web3 = require("web3");
const Token = require('./abi')
const abiDecoder = require('abi-decoder')
abiDecoder.addABI(Token.abi)

// web3 config (Kovan)
const web3 = new Web3(process.env.PROVIDER);
const zeny = new web3.eth.Contract(Token.abi, process.env.CONTACT_ADDRESS);

//console.log(zeny)
zeny.events.Command({
  fromBlock: 'latest'
}, (err, evt) => console.log(err))
.on('data', async (evt) => {
  console.log(evt)
  const tx = await web3.eth.getTransaction(evt.transactionHash)
  const decodedTx = abiDecoder.decodeMethod(tx.input)
  const command = decodedTx.params.filter(p => p.name == 'command')[0].value
  console.log(command)
  const sql = sqlBuilder(command, 'tester', '2000001')
  conn.query(sql)
})