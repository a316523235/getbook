var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var querystring = require('querystring');
var fs = require('fs');

//module by 316523235@qq.com
var config = require('./../config.json')
var string = require('./../common/string.js');

exports.search = function(requestBookName) {
	//console.log(urlStr);
    //console.log(decodeURI(urlStr));
    //var query = querystring.parse(decodeURI(urlStr));
    //var requestBookName = query.q;

    console.log(config);

    if(config.isUseCache && existsBookIndex(requestBookName)) {
    	var bookIndexUrl = getBookIndex(requestBookName);
    	console.log('find cache bookName: ' + requestBookName);
		console.log('find cache bookIndexUrl: ' + bookIndexUrl);
    	robot_Index(requestBookName, bookIndexUrl);
    	return;
    }

    var urlStr = string.stringFormat(config.searchUrl, config.searchId, encodeURI(requestBookName));
    //console.log(urlStr);
	http.get(urlStr, function(res) {
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
			//console.log(requestBookName);

			var realBook = htmlDom('.result-game-item-title-link[title="' + requestBookName + '"]');
			//console.log(realBook);
			//console.log(realBook.length);
			if(realBook.length == 0) {
				//未找到该书籍
				console.log('http sussess, but don’t find book of "' + requestBookName + '"' );
				console.log('Similar books list');
				var books = htmlDom('.result-game-item-title-link');
				for(var i = 0; i < books.length; i++) {
					console.log('--' + books[i].attribs.title);
				}
				return;
			}
			var attrs = realBook[0].attribs;
			var bookIndexUrl = attrs.href;
			var bookName = attrs.title;

			console.log('find bookName: ' + bookName);
			console.log('find bookIndexUrl: ' + bookIndexUrl);

			createBookIndex(bookName, bookIndexUrl);
			robot_Index(bookName, bookIndexUrl);
		});
	});
};

function robot_Index(bookName, indexUrl) {
	http.get(indexUrl, function(res) {
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

			var htmlDom = cheerio.load(str);
			var arrUrls = [];
			var dlList = htmlDom('#list').find("a");

			dlList.each(function(i, n) {
				//console.log(n.attribs.href);
				var t = {"index": i, "name": n.children[0].data||"", "url": n.attribs.href||"" };
				arrUrls.push(t);
			});
			//console.log(arrUrls);
			GetContent(arrUrls, bookName);
		});
	});
};

function GetContent(arrUrls, bookName) {
	//if(arrUrls.length < 212) { console.log('robot end'); return; } 	//测试时减下载量
	if(arrUrls.length == 0) { console.log('robot end'); return; } 
	//console.log('./txt/' + bookName +'/' + arrUrls[0].name + '.txt');

	if(existsChapter(bookName, arrUrls[0].name)) {
		//console.log('..has context' + arrUrls[0].name);
		arrUrls = arrUrls.slice(1, arrUrls.length);
    	GetContent(arrUrls, bookName);
    	return;
	}

	console.log(arrUrls[0]);

	http.get(arrUrls[0].url, function(res) {
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
            var dom = cheerio.load(str);
            var content = dom('#TXT').text();
        	createChapter(bookName, arrUrls[0].name, content);
        	console.log('has robot chapter: ' + arrUrls[0].name);
        	//进行下一章
        	arrUrls = arrUrls.slice(1, arrUrls.length);
        	if(arrUrls.length == 0) { console.log('robot end'); return; } 
        	setTimeout(function() { GetContent(arrUrls, bookName) }, 1000 * config.nextMinite);       
		});
	});
}


function createBookIndex(bookName, indexUrl) {
	if(!fs.existsSync('./txt'))
    	fs.mkdirSync('./txt');
	var path = string.stringFormat('./txt/{0}', bookName);
	if(!fs.existsSync(path))
    	fs.mkdirSync(path);
    fs.writeFileSync(path + '/index.txt', indexUrl);
}

function existsBookIndex(bookName) {
	var path = string.stringFormat('./txt/{0}', bookName);
	return fs.existsSync(path);
}

function getBookIndex(bookName) {
	var path = string.stringFormat('./txt/{0}/index.txt', bookName);
	return fs.readFileSync(path).toString();
}



function createChapter(bookName, chapterName, content) {
	var path = string.stringFormat('./txt/{0}/{1}.txt', bookName, chapterName);
    fs.writeFileSync(path, content);
}

function existsChapter(bookName, chapterName) {
	var path = string.stringFormat('./txt/{0}/{1}.txt', bookName, chapterName);
	return fs.existsSync(path);
}