const url = `http://35.154.233.185:8000/user/conferencelist`;

function queryConferencehistory(token, pageIndex) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      filter: {
        resultFields: [
          "StartTime",
          "Subject",
          "ConferenceID",
          "SubConferenceID",
          "ConferenceState",
          "Length",
          "TimeZone",
          "ScheduserName",
          "mediaTypes",
          "accessNumber",
          "factEndTime",
          "accountID",
          "totalSize",
        ],
        conditions: {
          key: "ConferenceState",
          value: "Destroyed",
          matching: "equal",
        },
        isAscend: "False",
        pageIndex: pageIndex,
        pageSize: 10,
      },
      isIncludeInvitedConference: "True",
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = queryConferencehistory;

// queryConferencehistory(
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODg5NTI4MjguNzUyNzQ2Nn0.Ie77LUqJCNVN66yePr77nxkHgYYHKIMf70YqHmJCDyg",
//   0
// ).then((res) => {
//   console.log(res);
// });
