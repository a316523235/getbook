//module by npm
var fs = require('fs');
var async = require('async');

var asyncSearch = require('./asyncSearch.js');
var robotBook = require('./../robotBook.json');

var bookMrg = function() {
	this.bookList = [];
};

module.exports = new bookMrg();

bookMrg.prototype.readBookList = function() {
	for(var i = 0; i< robotBook.length; i++) {
		if(robotBook[i].start == undefined || robotBook[i].start == '' || robotBook[i].start < 0) {
			robotBook[i].start = 0;
		}
		if(robotBook[i].len == undefined || robotBook[i].len == '' || robotBook[i].len < 0)
			robotBook[i].len = 100000;
	}
};

bookMrg.prototype.startRobot = function() {
	async.eachSeries(robotBook, function(item, callback) {
		if(item.bookName.trim() == '') 
			callback();
		else
		 	asyncSearch.search(item, callback);
	}, function(err) {
		console.log('err: ' + err);
	});
};