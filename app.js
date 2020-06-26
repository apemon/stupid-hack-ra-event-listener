require("dotenv").config();
const { sqlInsertCommand, sqlGetAccountId } = require("./utils");
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
}, (err, evt) => {
  if(err) 
    console.log(err)
})
.on('data', async (evt) => {
  //console.log(evt)
  // get command
  const tx = await web3.eth.getTransaction(evt.transactionHash)
  const decodedTx = abiDecoder.decodeMethod(tx.input)
  const command = decodedTx.params.filter(p => p.name == 'command')[0].value
  // get issuer & account_id
  const eth_addr = evt.returnValues.from
  const sqlGetAccount = sqlGetAccountId(eth_addr)
  let issuer = 'tester'
  let account_id = '2000001'
  try {
    const res = await conn.query(sqlGetAccount)
    if(res.length > 0) {
      const user = res[0]
      issuer = user.userid
      account_id = user.account_id
    }
    console.log(`command: ${command}, issuer: ${issuer}, account_id: ${account_id}`)
    const sql = sqlInsertCommand(command, issuer, account_id)
    await conn.query(sql)
  } catch (err) {
    console.log (err)
  }
})