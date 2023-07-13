const url = `http://35.154.233.185:8000/user/mocifyconference`;

function ModifyConference(token,conferenceID,SubconferenceID,body) {
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token : `${token}`,
        conferenceID: `${conferenceID}`,
        SubconferenceID: `${SubconferenceID}`,
        conferenceInfo: [`${body}`]
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = ModifyConference;

ModifyConference