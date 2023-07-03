const url = `http://35.154.233.185:8000/user/conferenceList`;

function queryConferenceList(token) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      conferenceFilter: {
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
            "summerTime",
            "isRecordConference",
            "mediaTypes",
            "accessNumber",
            "factEndTime",
            "accountID",
            "rownum",
            "totalSize",
          ],
          conditions: {
            key: "ConferenceState",
            value: "Destroyed",
            matching: "unequal",
          },
          isAscend: false,
          pageIndex: 0,
          pageSize: 15,
        },
        isIncludeInvitedConference: true,
      },
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = queryConferenceList;
