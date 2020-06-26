const sqlInsertCommand = (command, issuer, account_id) => {
  const sql = `INSERT INTO \`cp_commands\` (\`command\`, \`issuer\`, \`account_id\`, \`done\`, \`timestamp\`) VALUES ('${command}', '${issuer}', '${account_id}', 0, NULL);`;
  return sql;
};

const sqlGetAccountId = (eth_wallet) => {
  const sql = `SELECT login.\`userid\`, extend.* from \`login_extend\` as extend JOIN \`login\` as login ON extend.\`account_id\` = login.\`account_id\` where extend.\`eth_wallet\` = '${eth_wallet}'`;
  return sql;
};

module.exports = { sqlInsertCommand, sqlGetAccountId };
