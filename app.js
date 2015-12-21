//module by npm
var async = require('async');

//module by 316523235@qq.com
var config = require('./config.json');
var configMrg = require('./handler/configMrg.js');
var bookMrg = require('./handler/bookMrg.js');

//bookMrg.readBookList();
//return;
//新版，直接把小说名称放在robotBook.txt中就可以(小说间换行)
if(config.isInit) {
	bookMrg.readBookList();
	bookMrg.startRobot();
} else {
	configMrg.init(function() { 
		bookMrg.readBookList(); 
		bookMrg.startRobot(); 
	});
}

//旧版一次只下载一个
return
var search = require('./handler/search.js');

var bookName = process.argv.splice(2)[0] || '';
if(bookName == '')  {
	console.log('please input bookName, example: node app.js 上仙')
	return;
}
if(config.isInit) {
	search.search(bookName);
} else {
	configMrg.init(function() { search.search(bookName) });
}
