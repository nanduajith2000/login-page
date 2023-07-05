const url = `http://35.154.233.185:8000/user/conferencetemplate`;

function createconferencetemplate(
  token,
  templateId,
  length,
  size,
  timeZone,
  language,
  templateName
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      templateId: `${templateId}`,
      length: `${length}`,
      size: `${size}`,
      timeZone: `${timeZone}`,
      language: `${language}`,
      templateName: `${templateName}`,
      mediaTypes: `Voice`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data);
    });
}

module.exports = createconferencetemplate;

// createconferencetemplate(
//   "ODAzMjYyMTQ5NDk3NTM4ODYyMTgwMDAtMDAxMg==",
//   0,
//   320000,
//   20,
//   48,
//   "en_US",
//   "njandu's template",
//   "Voice"
// )
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
