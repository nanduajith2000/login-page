const url = `http://35.154.233.185:8000/user/`;

function EndConference(token,conferenceID) {
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token : `${token}`,
        conferenceID: `${conferenceID}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {console.log(data)});
}

module.exports = EndConference;