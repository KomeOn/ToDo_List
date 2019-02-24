const mongodb = require('mongodb').MongoClient;
let dbuser = "Sanket";
let dbpassword = "meangoing42";
let dbname = "shoppingkart";
let url = `mongodb://${dbuser}:${dbpassword}@ds058508.mlab.com:58508/shoppingkart`;
let  collection = '';
function connect() {
  mongodb.connect(url, function(err, client){
	  if(err) throw err;
	  let db = client.db(dbname);
	  collection = db.collection('shoppingkart');
  })
}

function insertDoc(ele) {
	collection.insertMany([ele], function(err, result){
	if(err) throw err;
	console.log(result);
})
}

function deleteDoc(ele) {
	collection.deleteOne(ele, function(err, result){
		if(err) throw err;
		console.log(result);
	})
}

function findAll(cb) {
	collection.find({}).toArray(function(err, result){
		if (err) throw err;
		cb(result);
	})
	
}

//function update() {
//	collection.updateOne({},{$set: {}})
//}

module.exports = {
	connect,
	insertDoc,
	deleteDoc,
	findAll
}