module.exports.ab2str = function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
module.exports.str2ab = function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
module.exports.fetchArrayBuffer = function fetchArrayBuffer(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() {
		callback(xhr.response);
	};
	xhr.send();
}
