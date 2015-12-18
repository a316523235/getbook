//module by npm
var async = require('async');

//module by 316523235@qq.com
var config = require('./config.json');
var configMrg = require('./handler/configMrg.js');
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
return;

//以下内容首次运行有bug,改为上面的内容
var tasks = [configMrg.init, search.search];
async.eachSeries(tasks, function (item, callback) {
	/*
	if(item === configMrg.init)
		console.log(1);
	if(item === search.search)
		console.log(3);
	callback();
	*/
	switch(item) {
		case configMrg.init:
			if(config.isInit)
				callback();
			else
				item(callback);
			break;
		case search.search:
			item(bookName);
			callback();
			break;
		default:
			//item();
			callback();
			break;
	}
}, function(err) {
	if(err) console.log('err' + err);
});
