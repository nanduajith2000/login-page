class API {
    static ConferenceInfo(token, conID, subconfID) {
      const url = `http://35.154.233.185:8000/user/queryconferenceinfo`;
  
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: `${token}`,
          conferenceID: `${conID}`,
          SubconferenceID: `${subconfID}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => data);
    }
  
    static ConferenceTemplateList(token) {
      const url = `http://35.154.233.185:8000/user/templatelist`;
  
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: `${token}`,
          resultFields: ["Parties", "Length", "TemplateID"],
          conditions: {
            key: "TemplateName",
            value: "t",
            matching: "like",
          },
          isAscend: false,
          pageIndex: 0,
          pageSize: 15,
        }),
      })
        .then((response) => response.json())
        .then((data) => data);
    }

    static createconference(token, length, size, timeZone, language, subject, startTime, attendees) {
        const url = `http://35.154.233.185:8000/user/createconference`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            length: `${length}`,
            size: `${size}`,
            timeZone: `${timeZone}`,
            language: `${language}`,
            subject: `${subject}`,
            startTime: `${startTime}`,
            mediaTypes: `Voice`,
            attendees: attendees,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static createconferencetemplate(token, templateId, length, size, timeZone, language, templateName) {
        const url = `http://35.154.233.185:8000/user/conferencetemplate`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            templateId: `${templateId}`,
            length: `${length}`,
            size: `${size}`,
            timeZone: `${timeZone}`,
            language: `${language}`,
            templateName: `${templateName}`,
            mediaTypes: `Voice`,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }
    
    static EndConference(token,conferenceID) {
        const url = `http://35.154.233.185:8000/user/`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token : `${token}`,
            conferenceID: `${conferenceID}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static InviteParticipants(token, conID, body) {
        const url = `http://35.154.233.185:8000/user/inviteparticipants`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            conferenceID: `${conID}`,
            inviteParas: {
                invitePara: [body],
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static LeaveParticipant(token,conferenceID,participantID) {
        const url = `http://35.154.233.185:8000/user/inviteparticipants`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token : `${token}`,
            conferenceID: `${conferenceID}`,
            participantID:`${participantID}`
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static Login(accountName, password, accountType) {
        const url = `http://35.154.233.185:8000/user/login`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: `${accountName}`,
            password: `${password}`,
            accountType: `${accountType}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static Logout(token) {
        const url = `http://35.154.233.185:8000/user/logout`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static modifyuserpassword(token, account, oldPassWord, newPassWord, newPassWordAffirm) {
        const url = `http://35.154.233.185:8000/user/modifyuserpassword`;
    
        return fetch(url, {
          method: "POST",
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
          .then((response) => response.json())
          .then((data) => data);
    }

    static MuteConference(token,conferenceID,mute) {
        const url = `http://35.154.233.185:8000/user/mute`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token : `${token}`,
            conferenceID: `${conferenceID}`,
            isAllMute: `${mute}`
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static queryConferencehistory(token, pageIndex) {
        const url = `http://35.154.233.185:8000/user/conferencelistX`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            filter: {
              resultFields: [
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
                "totalSize",
              ],
              conditions: {
                key: "ConferenceState",
                value: "Destroyed",
                matching: "equal",
              },
              isAscend: "False",
              pageIndex: pageIndex,
              pageSize: 10,
            },
            isIncludeInvitedConference: "True",
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static queryConferenceList(token) {
        const url = `http://35.154.233.185:8000/user/conferencelist`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            filter: {
              resultFields: [
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
                "totalSize",
              ],
              conditions: {
                key: "ConferenceState",
                value: "Destroyed",
                matching: "unequal",
              },
              isAscend: "False",
              pageIndex: 0,
              pageSize: 10,
            },
            isIncludeInvitedConference: "True",
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

    static RemoveConference(token, conferenceID, subconferenceID) {
        const url = `http://35.154.233.185:8000/user/deleteconference`;
    
        return fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: `${token}`,
            conferenceID: `${conferenceID}`,
            subconferenceID: `${subconferenceID}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => data);
    }

  }
  
  export default API;