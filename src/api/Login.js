function Login(
  // version,
  // accountType,
  accountName,
  password,
  token
  // ipaddr,
  // pinCode,
  // authToken,
  // authTokenType
) {
  const url = `http://127.0.0.1:8000/user/login`; // Replace with your API endpoint

  const headers = {
    "Content-Type": "application/json",
  };

  if (token != null) {
    headers.Authorization = `Basic ${token}`; // Replace with any necessary authentication headers
  }

  const requestBody = {
    email: `${accountName}`,
    password: `${password}`,
  };

  const requestOptions = {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: headers,
    body: JSON.stringify(requestBody),
  };

  return fetch(url, requestOptions)
    .then((response) => response.json()) // Parse the response as JSON

    .then((data) => data)
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}

module.exports = Login;
// Login("Test_Bsnl", "Bsnl~1234");
