const url = `http://35.154.233.185:8000/user/queryconferenceinfo`;

function ConferenceInfo(
  token,
  conID,
  subconfID
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
        SubconferenceID:`${subconfID}`
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {console.log(data)} );
}

module.exports = ConferenceInfo;
// ConferenceInfo("NzA5Mjk1MTUzNzEzNDIzOTQyNDYwMDAtMDAxMg==","1232582798","0")