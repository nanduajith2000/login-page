const url = `http://35.154.233.185:8000/user/modifyuserpassword`;

function modifyuserpassword(
  token,
  account,
  oldPassWord,
  newPassWord,
  newPassWordAffirm
) {
  var name = account.name;
  var type = account.type;
  return fetch(url, {
    method: "PUT", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: `${token}`,
      name: `${name}`,
      type: `${type}`,
      oldPassWord: `${oldPassWord}`,
      newPassWord: `${newPassWord}`,
      newPassWordAffirm: `${newPassWordAffirm}`,
    }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data);
    });
}

module.exports = modifyuserpassword;

modifyuserpassword(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODkyMTgyMDYuNDkwNzgyNX0.1cRCnKWsfRZmicbMVKoMcIOGXuyJqy7opWJS48LYrFs",

  {
    name: "Test_Bsnl",
    type: "WEB",
  },

  "Bsnl~1234",
  "Bsnl~12345",
  "Bsnl~12345"
)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
