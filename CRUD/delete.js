const writeToFile = require("./write_to_file");

module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[2];
  const regexV4 = new RegExp(/^\d+$/);

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "ID is not valid",
      })
    );
  } else if (baseUrl === "/users/" && regexV4.test(id)) {
    const index = req.users.findIndex((user) => {
      return user.id === id;
    });
    if (index === -1) {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "User not found" })
      );
      res.end();
    } else {
      req.users.splice(index, 1);
      writeToFile(req.users);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User deletion successful" })); // Add success message
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
