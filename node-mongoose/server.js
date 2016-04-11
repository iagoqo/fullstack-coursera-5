var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected correctly to server");

  // create a new dish
  Leadership.create({
    name: 'Uthapizza',
    description: 'Test',
    designation: '$5',
    abbr: 'test',
    image: 'test.png',
  }, function(err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    // get all the dishes
    setTimeout(function() {
      Leadership.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, dish) {
          if (err) throw err;
          console.log('Updated Dish!');
          console.log(dish);

          dish.save(function(err, dish) {
            console.log('Updated Comments!');
            console.log(dish);

            db.collection('leadership').drop(function() {
              db.close();
            });
          });
        });
    }, 3000);
  });
});
