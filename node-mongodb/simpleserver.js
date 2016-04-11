var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, (err, db) => {
  assert.equal(err, null);
  console.log("Connected correctly to server");

  var collection = db.collection("dishes");

  collection.insertOne({
      name: "Uthapizza",
      description: "test"
    },
    (err, result) => {
      assert.equal(err, null);
      console.log("After Insert:");
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found:");
        console.log(result.ops);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);
          db.close();
        })
      });
    }
  );
});
