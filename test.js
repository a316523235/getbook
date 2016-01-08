/*
console.log('-------string.stringFormat-----')
var string = require('./common/string.js');
var t = string.stringFormat('Type={0}&result={1}', 'stringFormat', 'success');
console.log('test format: ' + t);
*/

/*
console.log('-------config-----')
var config = require('./config.json');
console.log('config: ');
console.log(config);
*/

/*
console.log('-------search-----');
var config = require('./config.json');
var configMrg = require('./handler/configMrg.js');
var search = require('./handler/search.js');
if(config.isInit) {
	search.search('上仙')
} else {
	configMrg.init(function() {search.search('上仙')});
}
*/

console.log('-------bookMrg------');
var bookMrg = require('./handler/bookMrg.js');
console.log(bookMrg);
bookMrg.readBookList();
bookMrg.startRobot();

/*
console.log('-------async------');
var async = require('async');
function t(bookName, callback) {
	console.log(callback);
	console.log(bookName);
	setTimeout(function() { t2(bookName + 2, callback); }, 1000);
}

function t2(bookName, callback) {
	console.log(bookName);
	if(callback && bookName == 'bug2')
		callback('bookName can’t input ' + bookName);
	else
		callback();
}

var bookList = ['上仙', '上仙是个死宅', 'bug', '上人'];
async.eachSeries(bookList, function(item, callback) {
	t(item, callback);
}, function(err) {
	console.log('err: ' + err);
});
*/

/*
var http = require('http');
http.get('http://www.baidu.com/', function(res) {
	var body = [];
	res.on('data', function(chunk) {
		body.push(chunk);
	});
	res.on('end', function(chunk) {
		//todo
		console.log('也到这最')
	});
}).setTimeout(1000, function(){
  console.log('timeout!');
});
*/

