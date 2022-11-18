// Simple promise based http request, based on: https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const getRequest = function(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    url = new URL(url);
    let options = {
      hostname: url.hostname,
      path: url.pathname+url.search,
      headers: {
        'User-Agent': 'node-https'
      }
    };
    const request = lib.get(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
    })
};

const delay = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const leftZeroPad = function(str){
  if((str+'').length == 1){
    str = '0'+str;
  }
  return str;
}

module.exports = {
  getRequest: getRequest,
  delay: delay,
  leftZeroPad: leftZeroPad
};