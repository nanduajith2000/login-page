const url = `http://35.154.233.185:8000/user/modifyconference`;

function ModifyConference(
  token,
  conferenceID,
  SubconferenceID,
  length,
  size,
  timeZone,
  language,
  subject,
  startTime,
  attendees
) {
  return fetch(url, {
    method: "PUT", // Adjust the HTTP method (GET, POST, PUT, etc.) as required by your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        //conferenceInfo: [
        //{
        token: `${token}`,
        conferenceID: `${conferenceID}`,
        subconferenceID: `${SubconferenceID}`,
        length: `${length}`,
        size: `${size}`,
        timeZone: `${timeZone}`,
        language: `${language}`,
        subject: `${subject}`,
        startTime: `${startTime}`,
        mediaTypes: `Voice`,
        attendees: attendees,
      }
      //],
    ),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => console.log(data));
}

module.exports = ModifyConference;

// ModifyConference(
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJUZXN0X0JzbmwiLCJleHBpcnkiOjE2ODk0NzM4OTYuMDEzMTQ0N30._78jMM28rwUsinmIb1kLL9ArbXrapDHh8eLP0iU_O5U",
//   "1231795240",
//   "0",
//   600000,
//   3,
//   48,
//   "en_US",
//   "kamesh69",
//   1689845800000,
//   [
//     {
//       attendeeName: "njandu",
//       conferenceRole: "chair",
//       addressEntry: [
//         {
//           address: "9744139903",
//           type: "phone",
//         },
//       ],
//     },
//     {
//       attendeeName: "scambert",
//       conferenceRole: "general",
//       addressEntry: [
//         {
//           address: "9744139903",
//           type: "phone",
//         },
//       ],
//     },
//     {
//       attendeeName: "mukshay",
//       conferenceRole: "general",
//       addressEntry: [
//         {
//           address: "9746455089",
//           type: "phone",
//         },
//       ],
//     },
//   ]
// );
