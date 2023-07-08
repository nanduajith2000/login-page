const url = `http://35.154.233.185:8000/user/inviteparticipants`;

function InviteParticipants(
  token,
  conID,
//   body
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: `${token}`,
        conferenceID:`${conID}`,
        inviteParas:   {
            invitePara: [{
                "name": "GK",
                "phone": "+919020255100"
            },
            {
                "name": "Akshay",
                "phone": "+919746455089"
            }]
        }
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {console.log(data)} );
}

module.exports = InviteParticipants;

InviteParticipants("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiIxMjMyNTMzNjc5IiwiZXhwaXJ5IjoxNjg4OTU4MjkyLjI5MjI2Nzh9.xHDNXnlbDiHh5FkXL_sAujGOtjPwjxBV3ySTeHGYQQo","1232533679")