const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
require('env2')('./config.env');

let mongoDB;

MongoClient.connect(process.env.DATABASE_URL, (err, db) => {
  if (err) throw (err);
  mongoDB = db;
});

const dbQueries = {};

dbQueries.findUser = (data, callback) => {
  mongoDB.collection('users').findOne({
    $or: [{
      username: data.username
    }, {
      email: data.email
    }]
  }, callback);
};

dbQueries.addUser = (data, callback) => {
  mongoDB.collection('users').insertOne(data, callback);
};

dbQueries.addProfile = (data, callback) => {
  mongoDB.collection('users').update(
    { username: data.username },
    { $set: {
      shop: data.shop,
      about: data.about,
      image: data.image
    }
    }, callback);
};

dbQueries.getProfile = (user, callback) => {
  mongoDB.collection('users').findOne({ username: user }, callback);
};

dbQueries.addProduct = (data, callback) => {
  mongoDB.collection('products').insertOne(data, callback);
};

dbQueries.addUserProduct = (data, callback) => {
  mongoDB.collection('users').update(
    { username: data.username },
    { $push: { products: {
      id: data.id,
      product: data.product,
      category: data.category,
      description: data.description,
      price: data.price,
      image: data.image
    } }
    }, callback);
};

dbQueries.getProduct = (id, callback) => {
  mongoDB.collection('products').findOne({ _id: ObjectId(id) }, callback);
};

module.exports = dbQueries;
