const url = `http://35.154.233.185:8000/user/templatelist`;

function ConferenceTemplateList(token, jwtToken) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      token: `${token}`,
      resultFields: ["Parties", "Length", "TemplateID"],
      conditions: {
        key: "TemplateName",
        value: "t",
        matching: "like",
      },
      isAscend: false,
      pageIndex: 0,
      pageSize: 15,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = ConferenceTemplateList;

// ConferenceTemplateList("NDU1MzQ2MTUwMzI5MTE0NjY4NzgwMDAtMDAxMA==").then(
//   (res) => {
//     console.log(res);
//   }
// );
