var express = require('express');
var cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config()

var app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", function (req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.upfile;
  const name = uploadedFile.name;
  const type = uploadedFile.mimetype;
  const size = uploadedFile.size;

  const response = {
    name,
    type,
    size,
  };

  console.log(response);
  res.json(response);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
