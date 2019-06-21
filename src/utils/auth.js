export const doRequestWithToken = (url, method = 'GET', data = {}, cb) => {
  var token = localStorage.getItem('stackApitoken');
  fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Authorization': token ? JSON.parse(token) : ''
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json(res))
  .then(data => {
    console.log(data);
    if(data.error) {
      return cb(data.error, null)
    }
    if (data.name === "ValidationError" || data.name === "JsonWebTokenError") {
      return cb(data, null);
    }
    return cb(null, data);
  })
};

// export const fetchReputationScore = async (id) => {
//   var a = await fetch(`http://localhost:4000/api/v1/users/${id}/reputation`).then((res) => res.json());
//   console.log(a);
//   return a.reputationScore;
// }