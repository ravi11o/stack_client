exports.doRequestWithToken = (url, method = 'GET', data = {}, cb) => {
  var token = localStorage.getItem('stackApitoken');
  fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Authorization': token ? JSON.parse(token) : ''
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.error) {
      return cb(data.error, null)
    }
    if (data.name === "ValidationError" || data.name === "JsonWebTokenError") {
      return cb(data.message, null);
    }
    return cb(null, data);
  })
};