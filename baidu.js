var http = require('http');
var url = require('url');
var iconv = require('iconv-lite');
var fs = require('fs');


var startUrl = 'http://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=扫地机器人&oq=php%25E8%258E%25B7%25E5%258F%2596%25E7%25BD%2591%25E9%25A1%25B5%25E6%258C%2587%25E5%25AE%259A%25E5%2586%2585%25E5%25AE%25B9&rsv_pq=b54d82a80000ec06&rsv_t=76bePQUtHCACo05IxRZZqY84iJAtHvKusDCZnoZs8wcgdfkF%2BWdWcBkxIxQ&rsv_enter=1&inputT=4461&rsv_sug3=31&rsv_sug1=32&rsv_sug6=11&bs=php获取网页指定内容';
var replaceUrl = 'http://www.booyu.cn';

var searchStr = '哪个';

main(startUrl);

function main(urlStr) {
    http.get(urlStr, function (response) {
        var body = [];

        console.log(response.statusCode);
        console.log(response.headers);

        response.on('data', function (chunk) {
            body.push(chunk);
        });

        response.on('end', function () {
            body = Buffer.concat(body);
            iconv.decode(body, 'utf-8');

            var str = iconv.decode(body, 'utf-8');

            // 编码
            if(str.indexOf('�') != -1){
                str = iconv.decode(body, 'gbk');
            }

            console.log(str);

            str = str.replace(/\r\n/g, '');

            str = '<div><a href="1">牌子</a><a href="1">子</a><a href="1">牌子</a><a href="1">子</a></div>';

            var starIndex = str.indexOf('<div id="wrapper_wrapper">');
            var endIndex = str.lastIndexOf('</body>')
            str = '<div>' + str.substring(starIndex, endIndex);



        	console.log(str.toString());
        	console.log('----------------- begin -------------');
        	var div = str.match(/(<a[^>]*)(href="[^"]*")((\/?.*?)\/a>)/g);

        	if(div != null) {
        		for(var i = 0; i < div.length; i++) {
        			if(div[i].indexOf(searchStr) > -1) {

        			}
        		}


        		console.log(div.length);
        		console.log(div[0]);

        		console.log('---------------');

        		console.log(div[1]);
        		
        	} else {
        		console.log(null);
        	}
        	


            //str = str.replace(/\&nbsp;/g, '').replace(/<\S*\s*\S*>/g, '');
            

            /*

            fs.writeFile('./xsbc/' + page + '.txt', pageStr + str + '\n\r' + nextPage, function(err) {
                if(err) {
                    console.log('保存失败');
                    return;
                }
                console.log('保存成功');
            });
            */
        });
    });
}



//console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'));
//console.log(url.parse('http://user:a316523235@www.baidu.com'));

//example
//nodex client.js