const requestBodyparser = require("./body_parser");
const writeToFile = require("./write_to_file");

module.exports = async (req, res) => {
  if (req.url === "/users") {
    try {
      let body = await requestBodyparser(req);
      // Ensure the user provides an ID
      if (!body.id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Bad Request",
            message: "ID is required",
          })
        );
        return;
      }
      // Assuming `req.users` contains the array of users
      req.users.push(body);
      writeToFile(req.users);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post successful" })); 
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
