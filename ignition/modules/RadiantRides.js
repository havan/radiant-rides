const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NAME = "RadiantRides";
const SYMBOL = "SunnyCars";
const TOKEN_URI =
  "https://brooq6xsyzi4f4zijqnrgswizginuq5vtd3hmtfeeu3zmzmj346a.arweave.net/DFzoevLGUcLzKEwbE0rIyZDaQ7WY9nZMpCU3lmWJ3zw";

module.exports = buildModule("RadiantRides", (m) => {
  const name = m.getParameter("symbol", NAME);
  const symbol = m.getParameter("name", SYMBOL);
  const tokenURI = m.getParameter("tokenURI", TOKEN_URI);

  const radiantRides = m.contract("RadiantRides", [name, symbol, tokenURI]);

  return { radiantRides };
});
