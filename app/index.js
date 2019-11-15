const express = require("express");
const axios = require("axios");

const URL = require("url");
const app = express();
const { getFileData, pingWebsite } = require("./utils");
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
app.get("/api/ping_website", async (req, res) => {
  let urlParts = URL.parse(req.url, true);
  let website = urlParts.query.website;
  let response = await pingWebsite(website);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res
    .status(200)
    .send(JSON.stringify(response))
    .end();
});
app.get("/api/fetch_records", async (req, res) => {
  let urlParts = URL.parse(req.url, true);
  let queryParams = urlParts.query;
  let response = "";
  findAllRecord(queryParams)
    .then(response => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res
        .status(200)
        .send(JSON.stringify(response))
        .end();
    })
    .catch(err => console.log(err));
});
function findAllRecord(queryParams) {
  let arr = [0];
  for (let index = 5; index < 26; index++) {
    arr.push(index);
  }
  let recordType = queryParams.dnsType;
  let website = queryParams.website;
  return axios
    .all(
      arr.map(async function(id, index) {
        return axios
          .get(`https://dnschecker.org/api/${id}/${recordType}/${website}`)
          .then(function(response) {
            return response.data;
          });
      })
    )
    .then(function(list) {
      return list;
    });
}
app.get("/api/get_recent_searches", (req, res) => {
  let fileData = getFileData();
  let response = [];
  if (fileData) {
    for (i = 0; i < 10 && i < fileData.length; i++) response.push(fileData[i]);
  }
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res
    .status(200)
    .send(JSON.stringify(response))
    .end();
});
