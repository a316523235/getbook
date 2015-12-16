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


console.log('-------search-----');
var config = require('./config.json');
var configMrg = require('./handler/configMrg.js');
var search = require('./handler/search.js');
if(config.isInit) {
	search.search('上仙')
} else {
	configMrg.init(function() {search.search('上仙')});
}



