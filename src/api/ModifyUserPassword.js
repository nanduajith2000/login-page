const url = `http://35.154.233.185:8000/user/modifyuserpassword`;

function modifyuserpassword(
  token,
  account,
  oldPassWord,
  newPassWord,
  newPassWordAffirm
) {
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      account: account,
      oldPassWord: `${oldPassWord}`,
      newPassWord: `${newPassWord}`,
      newPassWordAffirm: `${newPassWordAffirm}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => data);
}

module.exports = modifyuserpassword;

// modifyuserpassword(
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODkyNTczODIuNDQ3ODkyNH0.ktqVTSZmAKuZ7sKktIG1Mwvw5klKj_vwv6-ZbR9uQNk",

//   {
//     name: "Test_Bsnl",
//     type: "WEB",
//   },

//   "Bsnl~12345",
//   "Bsnl~1234",
//   "Bsnl~1234"
// )
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
