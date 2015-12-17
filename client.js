var http = require('http');
var url = require('url');
var iconv = require('iconv-lite');
var fs = require('fs');

var t = 0;
var startUrl = '';
fs.readFile('config.txt', function(err, data) {
    if(err) {
        console.log('起始地址不存在！');
        return;
    }
    startUrl = data.toString().match(/\S+/)[0];
    console.log(startUrl);
    main(startUrl);
});
var getTime = 60000;    //每分钟下载一章
var maxPage = 3000;    //最大章节 3000章


//var startUrl = 'http://www.fhxs.com/read/12/12265/4248201.shtml';

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

            //console.log(str)
            
            var pageStr = str.match(/第\d*章/)[0];
            var page = pageStr.substring(1, pageStr.length-1);
            //console.log(page);

            var nextPage = str.match(/.{60}下一章/)[0].match(/http\S*shtml/)[0];
            //console.log(nextPage);

            var starIndex = str.indexOf('<!--go-->');
            var endIndex = str.indexOf('<div class="bottem">')
            str = str.substring(starIndex, endIndex);
            str = str.replace(/\&nbsp;/g, '').replace(/<\S*\s*\S*>/g, '');
            //console.log(str.toString());

            if(page == undefined || page == null || page == '') {
                console.log('章节不存在');
                return;
            }

            fs.writeFile('./xsbc/' + page + '.txt', pageStr + str + '\n\r' + nextPage, function(err) {
                if(err) {
                    console.log('保存失败');
                    return;
                }
                console.log('保存成功');
            });

            if(t < maxPage && nextPage != undefined && nextPage != '') {
                t++;
                //var handleStr = 'main(' + nextPage + ')';
                setTimeout(function() { {main(nextPage)}(nextPage); }, getTime);
                //main(nextPage);
            }
        });
    });
}



//console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash'));
//console.log(url.parse('http://user:a316523235@www.baidu.com'));

//example
//nodex client.js