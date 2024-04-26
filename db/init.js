const path = require('path');
const config = require(path.join(__dirname, '../src/db/config/config.js'));
const envConfig = config[process.env.NODE_ENV];
const { Client } = require('pg');

if (!envConfig) {
  console.error(`No config found for NODE_ENV=${process.env.NODE_ENV}`);
  return;
}
async function main() {
  let client = new Client({
    host: envConfig.host,
    port: envConfig.port,
    user: envConfig.username,
    password: envConfig.password,
  });
  await client.connect();
  await client.query(`CREATE DATABASE ${envConfig.database}`);
  await client.end();
}
main();
