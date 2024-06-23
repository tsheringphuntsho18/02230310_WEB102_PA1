module.exports = (req, res) => {
let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') +1);
console.log(baseUrl);
let id = req.url.split('/') [2];
const regexV4 = new RegExp(/^\d+$/);
    if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.users));
        res.end();
    }else if(!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ title: "Validation Failed", message: "ID is not valid" })
        );

    }else if(baseUrl === "/users/" && regexV4.test(id)) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        let filteredUser = req.users.filter((user) => {
            return user.id === id;
        });
        if(filteredUser.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filteredUser));
            res.end();

        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "User not found" }));
            res.end();
        }

    }else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};