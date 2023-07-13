const url = `http://35.154.233.185:8000/user/login`;

function Login(accountName, password, accountType) {
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${accountName}`,
      password: `${password}`,
      accountType: `${accountType}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = Login;
// Login("1231795241", "616985", "ConferenceID");
