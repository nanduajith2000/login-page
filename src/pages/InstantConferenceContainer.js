import React, { useState } from "react";
import InstantConference from "./InstantConference";
import AddParticipants from "../components/AddParticipants";
import participantsData from "../data/participantsData.json";

const ConferenceContainer = () => {
  const [participants, setParticipants] = useState(participantsData);

  const handleAddParticipant = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const handleCheckedUser = (participantId) => {
    // Update the participants state based on the checked user
  };

  const handleMute = (participantId) => {
    // Update the participants state based on the mute action
  };

  const handleCall = (participantId) => {
    // Update the participants state based on the call action
  };

  return (
    <>
      <InstantConference
        participants={participants}
        handleCheckedUser={handleCheckedUser}
        handleMute={handleMute}
        handleCall={handleCall}
      />
      <AddParticipants onAddParticipant={handleAddParticipant} />
    </>
  );
};

export default ConferenceContainer;
