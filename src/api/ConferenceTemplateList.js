const url = `http://35.154.233.185:8000/user/templatelist`;

function ConferenceTemplateList(
  token
) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      resultFields: [
        "Parties",
        "Length",
        "TemplateID"
      ],
      conditions: {
        key: "TemplateName",
        value: "t",
        matching: "like",
      },
      isAscend: false,
      pageIndex: 0,
      pageSize: 15,
    },
),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {console.log(data)});
}

module.exports = ConferenceTemplateList;

ConferenceTemplateList("MTYwMTI2MTUwMTMzMTIzMTc1NTMwMDAtMDAxMA==");