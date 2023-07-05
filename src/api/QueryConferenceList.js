const url = `http://35.154.233.185:8000/user/conferencelist`;


function queryConferenceList(token) {
  //attendee is a json file
  return fetch(url, {
    method: "POST", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: `${token}`,
        "filter":{
          "resultFields":[
            "StartTime",
            "Subject",
            "ConferenceID",
            "SubConferenceID",
            "ConferenceState",
            "Length",
            "TimeZone",
            "ScheduserName",
            "mediaTypes",
            "accessNumber",
            "factEndTime",
            "accountID",
            "totalSize"], 
          "conditions":{
              "key":"ConferenceState",
              "value":"Destroyed",
              "matching":"unequal"
          },
          "isAscend":"False",
          "pageIndex": 0,
          "pageSize": 15 },
          "isIncludeInvitedConference":"True"
      },
    ),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      for(var i=1;i<=data['total'];i++){
          console.log(i)
          console.log(data[`${i}`].subject)
          console.log(data[`${i}`].size)
          console.log(data[`${i}`].length)
          const utcTimestamp = data[`${i}`].startTime;
          console.log(utcTimestamp)
          
         

          console.log(data[`${i}`].conferenceKey["conferenceID"])
          console.log(data[`${i}`].accountID)
          console.log(data[`${i}`].chair)
          console.log(data[`${i}`].general)
        }

    });
}

module.exports = queryConferenceList;

queryConferenceList("MTYwMTI2MTUwMTMzMTIzMTc1NTMwMDAtMDAxMA==");