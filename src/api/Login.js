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
  const url = `http://35.154.233.185:8000/user/login`; // Replace with your API endpoint

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

    .then(
      (data) => data //{
      // Process the returned XML data
      //   fs.writeFile("output.xml", data, (error) => {
      //     if (error) {
      //       console.error("Error writing file:", error);
      //     } else {
      //       console.log("Data saved to file: output.xml");
      //     }
      //   });
      // console.log(data);
      // console.log(typeof JSON.stringify(data));

      //   console.log(data);
      //   data.JSON();

      // }
    )
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}

module.exports = Login;
// Login("Test_Bsnl", "Bsnl~1234");
