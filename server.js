const express = require("express");
const Request = require("request");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8888;
app.use(cors());

const BASE_URL = "https://blockchain.info";

app.get("/single-block/:hash", (req, res) => {
  Request.get(
    `${BASE_URL}/rawblock/${req.params.hash}`,
    (error, response, body) => {
      try {
        if (error) {
          return res.json(error);
        }
        return res.json(JSON.parse(body));
      } catch {
        return res.status(400).json({ message: body });
      }
    }
  );
});

app.get("/single-transaction/:hash", (req, res) => {
  Request.get(
    `${BASE_URL}/rawtx/${req.params.hash}`,
    (error, response, body) => {
      try {
        if (error) {
          return res.json(error);
        }
        return res.json(JSON.parse(body));
      } catch {
        return res.status(400).json({ message: body });
      }
    }
  );
});

app.get("/latest-block", (req, res) => {
  Request.get(`${BASE_URL}/latestblock`, (error, response, body) => {
    try {
      if (error) {
        return res.json(error);
      }
      return res.json(JSON.parse(body));
    } catch {
      return res.status(400).json({ message: body });
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
