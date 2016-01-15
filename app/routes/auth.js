var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');

var config = require('../config');

function getToken(params, next) {
	var postData = querystring.stringify(params);

	var options = {
	  host: config.oauth_host,
	  path: config.oauth_path,
	  port: 443,
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': postData.length,
	    'Accept': 'application/json'
	  }
	};

  //making the https get call
  var postReq = https.request(options, function(res) {
  	var dataText = "";
    res.on('data', function(chunk) {
      dataText += chunk;
    });
    res.on('end', function(){
      var data = JSON.parse(dataText);
    	next(data);
    });
  });

  //end the request
  postReq.write(postData);
  postReq.end();
  postReq.on('error', function(err){
      console.log("Error: ", err);
  }); 
}

router.get('/', function(req, res, next) {
	if (!config.client_secret || !config.client_id ||
		!config.redirect_uri || !config.site_url ||
		!config.oauth_host || !config.oauth_path) {
		var error = "";
		if (!config.client_secret) {
			error += 'CLIENT_SECRET is not set ';
		}
		else if (!config.client_id) {
			error += 'CLIENT_ID is not set ';
		}
		else if (!config.redirect_uri) {
			error += 'REDIRECT_URI is not set ';
		}
		else if (!config.site_url) {
			error += 'SITE_URL is not set ';
		}
		else if (!config.oauth_host) {
			error += 'OAUTH_HOST is not set ';
		}
		else if (!config.oauth_path) {
			error += 'OAUTH_PATH is not set ';
		}
		res.json({error: error});
	}
	else {
		if (req.query.code) {
			var code = req.query.code;
			var redirect_uri;
			var site_url;
			if (req.query.site_url) {
				var site_url = req.query.site_url;
				redirect_uri = config.redirect_uri + "?site_url=" + site_url.replace('#', '%23');
			}
			else 
			{
				redirect_uri = config.redirect_uri;
				site_url = config.site_url;
			}
			var params = {
				client_id: config.client_id,
				client_secret: config.client_secret,
				code: code,
				grant_type: 'authorization_code',
				redirect_uri: redirect_uri
			}
			getToken(params, function(data) {
				if (data.hasOwnProperty('error-desc')) {
					res.json({error: data['error-desc'].value });
				}
				else if (data.access_token && data.token_type 
					&& data.orcid && data.name) {
					var url = site_url + '?name=' + data.name + 
						'&access_token=' + data.access_token + 
						'&token_type=' + data.token_type +
						'&orcid=' + data.orcid;
					// TODO:
					// Add security checking here.
					// Don't send via HTTP.
					res.redirect(url);
				}
				else {
					res.json({error: 'unknown error' });
				}
			});
		}
		else {
			res.json({ error: 'invalid request'});
		}
	}
});

module.exports = router;

