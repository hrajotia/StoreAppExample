var fs = require("fs");
var _ = require('underscore');
var express = require('express');

var app = express();
app.use(express.static(__dirname + "/"));

var filepath = __dirname + "/store/data/" + "stores.json";


// to get all store data
app.get('/stores', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile(filepath, 'utf8', function(err, data) {
    var status = {};
    status["success"] = false;

    if (err) {
      console.log(err);
      status["message"] = "File read error!";
      res.end(JSON.stringify(status));
      return;
    }

    data = JSON.parse(data);
    var stores = data.stores;

    res.end(JSON.stringify(stores));
  });
});


// to get single store item data
app.get('/store/:id', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile(filepath, 'utf8', function(err, data) {
    var status = {};
    status["success"] = false;

    if (err) {
      console.log(err);
      status["message"] = "File read error!";
      res.end(JSON.stringify(status));
      return;
    }

    data = JSON.parse(data);
    var storeItemId = +req.params.id;
    var stores = data.stores;
    var store = _.where(stores, {id: storeItemId});
    store = store.length > 0 ? store[0] : {};

    res.end(JSON.stringify(store));
  });
});


// to create new store data (work in progress)
app.post('/store/:id', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile(filepath, 'utf8', function(err, data) {
    var status = {};
    status["success"] = false;

    if (err) {
      console.log(err);
      status["message"] = "File read error!";
      res.end(JSON.stringify(status));
      return;
    }

    data = JSON.parse(data);
    var storeItemId = +req.params.id;
    var stores = data.stores;
    var store = _.where(stores, {id: storeItemId});

    if (store.length > 0) {
      status["messgae"] = "Already exists!";
    } else {
      status["success"] = true;
    }

    res.end(JSON.stringify(status));
  });
});


// to update single store item data (work in progress)
app.put('/store/:id', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile(filepath, 'utf8', function(err, data) {
    var status = {};
    status["success"] = false;

    if (err) {
      console.log(err);
      status["message"] = "File read error!";
      res.end(JSON.stringify(status));
      return;
    }

    data = JSON.parse(data);
    var storeItemId = +req.params.id;
    var stores = data.stores;
    var store = _.where(stores, {id: storeItemId});

    if (store.length > 0) {
      status["messgae"] = "Already exists!";
    } else {
      status["success"] = true;
    }

    res.end(JSON.stringify(status));
  });
});


// to delete single store item data
app.delete('/store/:id', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});

  fs.readFile(filepath, 'utf8', function(err, data) {
    var status = {};
    status["success"] = false;

    if (err) {
      console.log(err);
      status["message"] = "File read error!";
      res.end(JSON.stringify(status));
      return;
    }

    data = JSON.parse(data);
    var storeItemId = +req.params.id;
    var stores = data.stores;
    var index = _.findIndex(stores, function(storeItem) {
        return storeItem.id === storeItemId
    });

    if (index > -1) {
      stores.splice(index, 1);
      fs.writeFile(filepath, JSON.stringify(data), 'utf8', function(err, data) {
        if (err) {
          console.log(err);
          res.end(JSON.stringify(status));
          return;
        }

        status["success"] = true;
        res.end(JSON.stringify(status));
      });
    } else {
      status["messgae"] = "Invalid Id!";
      res.end(JSON.stringify(status));
    }
  });
});

var server = app.listen(process.env.PORT || 8080, function() {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
