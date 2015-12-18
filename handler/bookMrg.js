//module by npm
var fs = require('fs');
var async = require('async');

var asyncSearch = require('./asyncSearch.js');

var bookMrg = function() {
	this.bookList = [];
};

module.exports = new bookMrg();

bookMrg.prototype.readBookList = function() {
	var buff = fs.readFileSync('./robotBook.txt');
	if (buff[0].toString(16).toLowerCase() == "ef" 
		&& buff[1].toString(16).toLowerCase() == "bb" 
		&& buff[2].toString(16).toLowerCase() == "bf") {
			buff = buff.slice(3);
	}
	this.bookList = buff.toString().trim().split('\r\n');
	console.log('待下载小说：' );
	console.log(this.bookList);
};

bookMrg.prototype.startRobot = function() {
	async.eachSeries(this.bookList, function(item, callback) {
		if(item.trim() == '') 
			callback();
		else
		 	asyncSearch.search(item, callback);
	}, function(err) {
		console.log('err: ' + err);
	});
};