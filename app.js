//module by 316523235@qq.com
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