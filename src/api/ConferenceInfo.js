const url = `http://35.154.233.185:8000/user/queryconferenceinfo`;

function ConferenceInfo(token, conID, subconfID) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      conferenceID: `${conID}`,
      SubconferenceID: `${subconfID}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = ConferenceInfo;

// ConferenceInfo(
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODk0MzAwMDguNDQwMDI0OX0.qpDIS27fviS3gSPdVH-roF3_giuI9-CDVjOc7CAASAQ",
//   "1231795240",
//   "0"
// );
