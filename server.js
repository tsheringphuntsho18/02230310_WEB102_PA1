const http = require('http');
const getReq = require('./CRUD/get');
const putReq = require("./CRUD/put");
const postReq = require("./CRUD/post");
const deleteReq = require("./CRUD/delete");
let users = require('./Json_file/users.json');

const PORT = 3000;

const server = http.createServer((req, res) => {
    req.users = users;
    switch (req.method) {
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({ title: "Not Found", message: "Route not found"}));
            res.end();

    }

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
