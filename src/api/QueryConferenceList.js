const url = `http://35.154.233.185:8000/user/conferencelist`;
function convertUTCMillisecondsToDate(utcMilliseconds) {
  // Create a new Date object with the UTC milliseconds
  var date = new Date(utcMilliseconds);

  // Specify the time zone as 'Asia/Kolkata' for Indian time
  var options = { timeZone: "Asia/Kolkata" };

  // Extract the different components of the date in Indian time
  var year = date.toLocaleString("en-IN", { year: "numeric", options });
  var month = date.toLocaleString("en-IN", { month: "2-digit", options });
  var day = date.toLocaleString("en-IN", { day: "2-digit", options });
  var hours = date.toLocaleString("en-IN", {
    hour: "2-digit",
    hour12: false,
    options,
  });
  var minutes = date.toLocaleString("en-IN", { minute: "2-digit", options });

  // Format the date and time string
  var formattedDate = year + "-" + month + "-" + day;
  var formattedTime = hours + ":" + minutes;

  // Return the formatted date and time
  return {
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
  };
}

function convertMillisecondsToHoursAndMinutes(milliseconds) {
  var hours = Math.floor(milliseconds / (1000 * 60 * 60));
  var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: hours, minutes: minutes };
}

function queryConferenceList(token, jwtToken) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
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
          matching: "unequal",
        },
        isAscend: "False",
        pageIndex: 0,
        pageSize: 15,
      },
      isIncludeInvitedConference: "True",
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data)
    .catch((err) => console.log(err));
}

module.exports = queryConferenceList;

queryConferenceList(
  "NjkxODU4MTUxMTQwMDE5ODMzNjgwMDAtMDAxMA==",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiO…A3N30.xqzaZz73S9W6eN6_3jwKTv06fHhh0vjasUmToKK8OG4"
);
