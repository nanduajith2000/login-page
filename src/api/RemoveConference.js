const url = `http://35.154.233.185:8000/user/deleteconference`;

function EndConference(token, conferenceID) {
  return fetch(url, {
    method: "DELETE", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      conferenceID: `${conferenceID}`,
      subconferenceID: "0",
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => console.log(data));
}

module.exports = EndConference;

EndConference(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODkxMjQ0MjYuODYwODYzN30.Ejl8Hb3f4kb7Qg_wy4RlywGDOxgQ8JBQIwsFVlIJ8k4",
  "1231842726"
);
