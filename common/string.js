exports.stringFormat = function() {
	if (arguments.length == 0)
		return null;
	var str = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};

/*
exports.ClearBom = function(buff) {
	if (buff[0].toString(16).toLowerCase() == "ef" 
		&& buff[1].toString(16).toLowerCase() == "bb" 
		&& buff[2].toString(16).toLowerCase() == "bf") {
			buff = buff.slice(3);
	}
	return buff;
};
*/


//test
//var t = stringFormat('&Type={0}{1}', 'straa', '33');
//console.log(t);