const fs = require("fs");

const readFile = (fileName) => {
  return JSON.parse(fs.readFileSync(`./moduls/${fileName}`, "utf-8"));
};
const writeFile = (fileName, data) => {
  return fs.writeFileSync(
    `./moduls/${fileName}`,
    JSON.stringify(data, null, 4)
  );
};

module.exports = {
  readFile,
  writeFile,
};
