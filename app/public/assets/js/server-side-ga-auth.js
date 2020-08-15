var pClaim = {};
pClaim.aud = 'https://www.googleapis.com/oauth2/v3/token';
pClaim.scope = 'https://www.googleapis.com/auth/analytics.readonly';
pClaim.iss = 'thaiglob-analytics@thaiglob.iam.gserviceaccount.com';
pClaim.exp = KJUR.jws.IntDate.get('now + 1hour');
pClaim.iat = KJUR.jws.IntDate.get('now');
var sClaim = JSON.stringify(pClaim);
var key =
	'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdCTWWR/IkX5HA\n5ATFU+bmDgt3WTud1/ozd94tmJfJKro/SFry6N+zaxPmHwh5RDjd7si8gox8L8F3\n1KJEs7NlyMR2EnFHTjYOmW9nr0GnDGHXO8FM/hEZ6uc4tCgwkSBgjxKn8Kb3cGZz\n4DvCgFQHwkP+dKNgK515LYEwZvWTxfYT1Q/zBV9d6Bmw7zl24k00oBY0BK0uhRUU\nme+cLewvf6JsMCEQQ6Eeky/NKold9GKlHcjdcRiJsLxfoAcn/VHU1pCrplQ//f7C\nLjfvvqSba2bzNiMskmzkxSeSxYhVIoyVj6lI+9CyMS88iWtMWuXCLx7WXxKVC+sh\nL+euidJnAgMBAAECggEAK1WBYH+lbNUhvafWeZtL4uFxBQqFAhqULl/7OoQ2idVr\nIzn7vrDCHqpJAe4mmqOx5GzKhQ6xHS29p9ETqRVz/+n+/kj6VWjzdyREr5av7+Ch\nE/HeoUoULzka8MZ9NJxXNScHmM445bzvERuui6DeGJFRBEN4vkN+wYGW2NbuoXQq\nPikLHh6bh1FhGuowK7uzcj5SpAqaEa3UPjHYBm3HIvZB2RguaXlTuNtF1odO1be6\nhpueJj4A4zz+rz1p0mR6SE2rrho5HEt/KjgBhQT1NZc7wOSzaPIEZtIDdPbKkkUT\nYi0iJj/p8K1isrZ+pBrr+BsPXCRN3maiP0jusqRJwQKBgQD4/QvxoMKuJoy2Rna1\n7B0fLaLJEoId3/613VOOOgjbIOs7UxCMr4WGf44dNSayGNmrKRRK/NIJlMzHJBhY\nmJLYh9bAZK9Ba+cZChjqm6iJjvKWkT0DxUu8UOPuHiegx0kDCEt1tJ4e5JLgas8u\nUbm9Y/S5SxCJFZkuRbkWuSQPpwKBgQDjQqdXQyc7u54gg3XP9s2vGW8m99zqS93z\nn4So93kRKWkAQDRmjGcClB8Hx1zYrJIwbfUiOj0bYnpCjgue50bqQdUgK0WhsmAC\n2CsQmRrz5WavkISHRFcH6PWILX3JFpvO4lLjqimCK/6JJ/8rgNRsBWyMHS5HdDh+\n1XuytjJ/QQKBgQDIzpRuaD/6Yf7EFqow6F9IQO7ziWjFHVz4Yaq8nxN7Xt44NzK2\ns+xVX9RGvBIcOqx6PSQvohznO0m4JeU4trxfw5YwDkPF2HdGG32i4K0ZW99MDZCO\n1PTSyM46wbkmEvNQbcUmBegsdB38vkefTKwnEVFSizanyHKE/hhbOi/aKwKBgBrE\nU/9kKm/Ppk1ADpVDBXDVNxFI6l0yOF8kb7STCVBrJzHfXgyiBtP37Du3UIk4sjNA\nEDpKz720+J90KYw6w1B+FoMmdZoY71QGb/QRhGorn8+X3vQrqXCGEL1MVl9j6VAR\nuh+UgDUTx3QSIOzXzK04alOKcFP8LVdK/7nJ2eLBAoGAHIGv/vfbcoV2VBLBn3k5\nsEkX3LYz71hv45kwPW8rqYH1PVdASAyWlbJ0jgZpK0iOUexmY8QcoaCnDvEQKpeo\nh/LmatXAjBliL11SP83e+vE/h+PGS9+7knMf9RaNqH1a9npBTluYLt0R+vnMq9Tk\nxzV1w5AMx+nVNI1uoGDINPE=\n-----END PRIVATE KEY-----\n';
var sJWS = KJUR.jws.JWS.sign(null, { alg: 'RS256', typ: 'JWT' }, sClaim, key);
var XHR = new XMLHttpRequest();
var urlEncodedData = '';
var urlEncodedDataPairs = [];
urlEncodedDataPairs.push(
	encodeURIComponent('grant_type') +
		'=' +
		encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')
);
urlEncodedDataPairs.push(
	encodeURIComponent('assertion') + '=' + encodeURIComponent(sJWS)
);
urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
// We define what will happen if the data are successfully sent
XHR.addEventListener('load', function (event) {
	var response = JSON.parse(XHR.responseText);
	token = response['access_token'];
});
// We define what will happen in case of error
XHR.addEventListener('error', function (event) {
	console.log('Oops! Something went wrong.');
});

XHR.open('POST', 'https://www.googleapis.com/oauth2/v3/token');
XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
XHR.send(urlEncodedData);

(function (w, d, s, g, js, fs) {
	g = w.gapi || (w.gapi = {});
	g.analytics = {
		q: [],
		ready: function (f) {
			this.q.push(f);
		},
	};
	js = d.createElement(s);
	fs = d.getElementsByTagName(s)[0];
	js.src = 'https://apis.google.com/js/platform.js';
	fs.parentNode.insertBefore(js, fs);
	js.onload = function () {
		g.load('analytics');
	};
})(window, document, 'script');
