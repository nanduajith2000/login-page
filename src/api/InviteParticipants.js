const url = `http://35.154.233.185:8000/user/inviteparticipants`;

function InviteParticipants(token, conID, body) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      conferenceID: `${conID}`,
      invitePara: body,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => console.log(data));
}

module.exports = InviteParticipants;

InviteParticipants(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxMjMyNzE5MjIzIiwiZXhwaXJ5IjoxNjg5NDUyNjE3Ljc3MzYwN30.rTQTzY3H_GPlvWB7oR6WcTZipAu2paRi9vDWq7H5Gs4",
  "1232719223",
  [
    {
      name: "njandu",
      phone: "8848750913",
    },
  ]
);
