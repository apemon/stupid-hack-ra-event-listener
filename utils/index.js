const sqlBuilder = (command, issuer, account_id) => {
  const sql = `INSERT INTO \`cp_commands\` (\`command\`, \`issuer\`, \`account_id\`, \`done\`, \`timestamp\`) VALUES ('${command}', '${issuer}', '${account_id}', 0, NULL);`;
  return sql;
};

module.exports = { sqlBuilder };
