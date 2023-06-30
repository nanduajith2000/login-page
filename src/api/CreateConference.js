const url = `http://35.154.233.185:8000/user/createconference`;

        function createconference(token,length,size,subject,startTime,attendee)//attendee is a json file
            {
                return fetch(url, {
                    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token : `${token}`,
                        length :`${length}`,
                        size:`${size}`,
                        subject:`${subject}`,
                        startTime:`${startTime}`,
                        attendee:`${attendee}`
                    }),
                })
                .then((response) => response.json()) // Parse the response as JSON
                .then((data) => data)
            }
        
            module.exports = createconference;