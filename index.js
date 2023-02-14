const http = require("http");
const ip = require("ip");
const { v4 } = require("uuid");
const { readFile, writeFile } = require("./api/fs_api");
const PORT = 5000;
const app = http.createServer((req, res) => {
  console.log(req.method);

  const options = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (req.method == "GET" && req.url == "/courses") {
    res.writeHead(200, options);
    let courses = readFile("courses.json");
    res.end(JSON.stringify(courses));
  }

  if (req.method == "POST" && req.url == "/create_courses") {
    req.on("data", (chunk) => {
      let data = JSON.parse(chunk);
      let courses = readFile("courses.json");

      courses.push({ id: v4(), ...data });
      writeFile("courses.json", courses);

      res.writeHead(201, options);
      res.end(JSON.stringify("Post successful created..."));
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
  console.log("on network " + ip.address() + ":" + PORT);
});
