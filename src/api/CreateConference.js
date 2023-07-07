const url = `http://35.154.233.185:8000/user/createconference`;

function createconference(
  token,
  length,
  size,
  timeZone,
  language,
  subject,
  startTime
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: `${token}`,
      length: `${length}`,
      size: `${size}`,
      timeZone: `${timeZone}`,
      language: `${language}`,
      subject: `${subject}`,
      startTime: `${startTime}`,
      mediaTypes: `Voice`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data);
    });
}

module.exports = createconference;

// createconference(
//   "MTMxODIxMTQ5OTY2NDg1NDkyMDcwMDAtMDAxMg==",
//   600000,
//   3,
//   48,
//   "en_US",
//   "kamesh",
//   1688845800000
// );
