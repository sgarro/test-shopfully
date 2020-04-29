import csv from "csv-parser";
import express from "express";
import fs from "fs";
import cors from 'cors'
import serverless from "serverless-http";
const app = express();
app.use(cors())

app.get('/', (req, res)=>{
  res.status(200)
})

app.get("/api/flyers", (req, res) => {
  const images = ["it-it-media.shopfully.cloud/images/volantini/big_615293.jpg",
  "it-it-media.shopfully.cloud/images/volantini/big_615209.jpg",
  "it-it-media.shopfully.cloud/images/volantini/big_616132.jpg",
  "it-it-media.shopfully.cloud/images/volantini/big_615356.jpg",
  "it-it-media.shopfully.cloud/images/volantini/big_615322.jpg",
  "it-it-media.shopfully.cloud/images/volantini/big_615333.jpg"]
  // hack to get int, i would have use req.param instead of a query
  const page = +req.query.page;
  const limit = +req.query.limit;
  const path = "./public/flyers_data.csv";
  let rowRead = 0;
  const begin = (page === 1)? 0 : (page - 1) * limit;
  const end = (page * limit)-1;
  const file = [];
  const stream = fs
    .createReadStream(path)
    .pipe(csv())
    // reading csv line by line
    .on("data", (data) => {
      //  reached limit of requested lines, close the streaming
      if (rowRead === end) {
        stream.destroy();
      }
      // desired lines
      if (rowRead >= begin) {
        // pushing a random image for test purpose
        const image = images[Math.floor(Math.random() * images.length)];
        data.image = image
        file.push(data);
      }
      rowRead++;
    })
    .on("close", () => {
      // stream closed manually due to pagination
      res.status(200).send(file);
    })
    .on("end", () => {
      // stream closed because read all the file
      res.status(200).send(file);
    });
});

module.exports.handler = serverless(app)
