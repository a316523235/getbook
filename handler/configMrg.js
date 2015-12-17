//module from npm
var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');

//module by ice
var config = require('./../config.json');

exports.init = function(callback) {
	if(config.isInit) {
		if(callback) callback();
		return;
	}

	http.get(config.domain, function(res) {
		var body = [];
		res.on('data', function(chunk) {
			body.push(chunk);
		});
		res.on('end', function(chunk) {
			body = Buffer.concat(body);
			var str = iconv.decode(body, 'utf-8');
			if(str.indexOf('�') != -1){
                str = iconv.decode(body, 'gbk');
            }
			var htmlDom = cheerio.load(body);
			var s = htmlDom('input[name="s"]').val();
			config.searchId = s;
			config.isInit = true;
			fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
			console.log('complete to get key');
			if(callback) callback();
		});
		res.on('err', function(err) {
			if(callback) callback('获取key失败：原因' + err);
		});
	});
}

