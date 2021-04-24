(function () {
  const express = require("express");
  const path = require("path");

  const news = require("./news");

  const app = express();

  const cors = require("cors");
  app.use(cors());

  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", (req, res) => {
    res.send("hello");
  });
  app.get(["/:url", "/:url/id"], (req, res) => {
    news.get(req.params.url).then((result) => {
      res.json(result);
    });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Listening on Port : ${PORT}`);
  });
})();
