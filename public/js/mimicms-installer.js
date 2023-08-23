let zip = new JSZip();

let instructionTitle = document.getElementById("instruction-title");
let instructionText = document.getElementById("instruction-text");

function freeHosting() {
  instructionTitle.innerHTML = "Instruction for free hosting";
  instructionText.innerHTML = `
    <ol>
      <li>Register a free account on <a href="https://replit.com/login" style="color: white">Replit</a> and . <a href="https://freedb.tech">FreeDB</a></li>
      <li>Create DB on FreeDB and paste host, DB name, user and password to form: <img src="/img/mimcms-install/freedb.png" alt="Create a repl" width="500" style="margin-left: 10px"></li>
      <li><p style="display: inline-flex">And click to: <img src="/img/mimcms-install/create-repl.png" alt="Create a repl" width="150" style="margin-left: 10px"></p></li>
      <li><img src="/img/mimcms-install/create-repl-menu.png" alt="Create a repl" width="500" style="margin-left: 10px"></li>
      <li>And unpack files from downloaded archive.</li>
      <li>Link your domain: <img src="/img/mimcms-install/repl-linking-domain.png" alt="Linking domain" width="500" style="margin-left: 10px"></li>
    </ol> 
    Enjoy! 😊
  `;
}

function selfHosting() {
  instructionTitle.innerHTML = "Instruction for self-hosting on Linux";
  instructionText.innerHTML = `
    <ol>
      <li>Install NODE.JS and NPM.</li>
      <li>Unpack files from downloaded archive.</li>
      <li>Run command: <code>npm install</code> and <code>npm start</code></li>
    </ol>
    Enjoy! 😊
  `;
}

// Zip archive generator

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.querySelector('input[name="name"]').value;
  let steamWebAPIKey = document.querySelector(
    'input[name="SteamWebAPIkey"]'
  ).value;
  let ownerID = document.querySelector('input[name="OwnerID"]').value;
  let domain = document.querySelector('input[name="Domain"]').value;
  let dbHost = document.querySelector('input[name="DB_HOST"]').value;
  let dbUser = document.querySelector('input[name="DB_USER"]').value;
  let dbPassword = document.querySelector('input[name="DB_PASSWORD"]').value;
  let dbName = document.querySelector('input[name="DB_NAME"]').value;
  let serverIP = document.querySelector('input[name="ServerIP"]').value;
  let serverPort = document.querySelector('input[name="ServerPort"]').value;
  let rconPort = document.querySelector('input[name="RCONport"]').value;
  let rconPassword = document.querySelector('input[name="RCONpassword"]').value;

  let thankTitle = document.getElementById("thanks");

  let formData = {
    Name: name,
    SteamWebAPIkey: steamWebAPIKey,
    OwnerID: ownerID,
    Domain: domain,
    DB_HOST: dbHost,
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
    DB_NAME: dbName,
    serverIP: serverIP,
    ServerPort: serverPort,
    RCONport: rconPort,
    RCONpassword: rconPassword,
  };

  let config = `module.exports = ${JSON.stringify(formData, null, 2)};`;

  function generateArchive() {
    fetch("/files")
      .then((response) => response.json())
      .then((data) => {
        let fileUrls = data.files;

        function addFileToZip(url) {
          let fileName = url.substring(url.lastIndexOf("/mimicms/") + 1);
          return fetch("mimicms/" + url)
            .then(function (response) {
              return response.blob();
            })
            .then(function (blob) {
              zip.file(fileName, blob, { binary: true });
            });
        }

        let promises = [];

        fileUrls.forEach(function (url) {
          promises.push(addFileToZip(url));
        });

        Promise.all(promises)
          .then(function () {
            zip.file("src/config/config.js", config);
            return zip.generateAsync({ type: "blob" });
          })
          .then(function (content) {
            saveAs(content, "mimicms.zip");
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  generateArchive();

  thankTitle.innerHTML = "Thank you for choosing MimiCMS specifically! ❤";
});
