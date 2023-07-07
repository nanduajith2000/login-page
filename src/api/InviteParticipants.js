const url = `http://35.154.233.185:8000/user/createconference`;

function InviteParticipants(
  token,
  name,
  email,
  phone,
  sms
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: `${token}`,
        inviteParas:   {
            name: `${name}`,
            email:`${email}`,
            phone:`${phone}`,
            sms:`${sms}`
        }
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data);
    });
}

module.exports = InviteParticipants;
