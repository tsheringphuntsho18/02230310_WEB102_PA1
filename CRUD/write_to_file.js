const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  console.log("the data to write in file:", data);
  const filePath = "/home/tshering/Desktop/restful-api/Json_file/users.json"; // Change this to your desired path

  // Write data to file
  fs.writeFile(filePath, JSON.stringify(data), "utf-8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data written to file successfully");
    }
  });
};
