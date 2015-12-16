//module from npm
var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');

//module by 316523235@qq.com
var string = require('./common/string.js');
var config = require('./config.json');
var configMrg = require('./handler/configMrg.js');
var search = require('./handler/search.js');

var bookName = process.argv.splice(2)[0] || '';
if(bookName == '') return;

if(config.isInit) {
	search.search(bookName)
} else {
	configMrg.init(function() {search.search(bookName)});
}