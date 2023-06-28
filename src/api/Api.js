const url = `http://127.0.0.1:8000/user/logout`;

        function Logout(token)
            {
                return fetch(url, {
                    method: "DELETE", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token : `${token}`
                    }),
                })
                .then((response) => response.json()) // Parse the response as JSON
                .then((data) => data)
            }
        
            module.exports = Logout;