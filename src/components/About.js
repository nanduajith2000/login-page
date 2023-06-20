import React from "react";

import photo1 from "../images/photo1.jpg";

import photo2 from "../images/photo2.jpg";

import photo3 from "../images/photo3.jpg";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h3 className="sub-container">
        Powered by industry leading convergent architecture, Huawei convergent
        conference provides all conference services in one system, including
        audio/web/Standard Definition/High Definition/Telepresence. Users can
        enjoy conferences anytime, anywhere, any devices.
      </h3>
      <div className="sub-container">
        <img src={photo1} alt="" className="image" />
        <div className="text-container">
          <h3> Any Devices, harmonious interoperability </h3>
          <div>
            Video conferencing is no longer limited to dedicated devices. Users
            can join convergent conference service by any devices: video
            conference endpoints, Telepresence endpoints, desktop video phone,
            PCs, smart phones and tablets, fixed or mobile phones.
          </div>
        </div>
      </div>
      <div className="sub-container">
        <div className="text-container">
          <h3>Immersive and multi-screen experience</h3>
          <div>
            Huawei convergent conference provides High definition video (up to
            1080p 60 fps), CD-quality audio. Users can get face to face and
            life-size experience. Users can enjoy high quality video on multi
            screens: Telepresence, TV, PC, smart phone, tablets.
          </div>
        </div>
        <img src={photo2} alt="" className="image" />
      </div>
      <div className="sub-container">
        <img src={photo3} alt="" className="image" />
        <div className="text-container">
          <h3> Efficient web collaboration </h3>
          <div>
            The end users can easily enjoy collaborations through web. Users can
            share presentations and applications, send instant message, join
            tele-balloting and electronic whiteboard. Besides the PC, users can
            also enjoy the collaboration from smart phones and tablet.
          </div>
        </div>
      </div>
    </div>
  );
}
