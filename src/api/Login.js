function Login(
  version,
  accountType,
  accountName,
  password,
  token,
  ipaddr,
  pinCode,
  authToken,
  authTokenType
) {
  const url = `https://conference.ngn.bsnl.co.in/rest/${version}/login?accountType=${accountType}&accountName=${accountName}&password=${password}`; // Replace with your API endpoint

  const headers = {
    "Content-Type": "application/xml",
  };

  if (token != null) {
    const headers = {
      Authorization: `Basic ${token}`, // Replace with any necessary authentication headers
    };
  }

  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
  <account>
  <ipaddr>${ipaddr}</ipaddr>
  <pinCode>${pinCode}</pinCode>
  <authToken>${authToken}</authToken>
  <authTokenType>${authTokenType}</authTokenType>
  </account>`;

  const requestOptions = {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: headers,
    body: xmlBody,
  };

  fetch(url, requestOptions)
    .then((response) => response.text()) // Parse the response as text
    .then((data) => {
      // Process the returned XML data
      //   fs.writeFile("output.xml", data, (error) => {
      //     if (error) {
      //       console.error("Error writing file:", error);
      //     } else {
      //       console.log("Data saved to file: output.xml");
      //     }
      //   });
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      return error;
    });
}

module.exports = Login;
