const url = `http://35.154.233.185:8000/user/createconference`;

function createconference(
  token,
  length,
  size,
  timeZone,
  language,
  subject,
  startTime,
  mediaTypes
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      length: `${length}`,
      size: `${size}`,
      timeZone: `${timeZone}`,
      language: `${language}`,
      subject: `${subject}`,
      startTime: `${startTime}`,
      mediaTypes: `${mediaTypes}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = createconference;

createconference(
  "NzU0NDg5MTQ3NDUxNDI0MjA5OTMwMDAtMDAxMA==",
  320000,
  5,
  48,
  "en_US",
  "meeting1",
  "1688310002000",
  "Voice"
)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
