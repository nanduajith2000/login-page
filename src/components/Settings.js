import React, { useState } from "react";

function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPIN] = useState("1234");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [allowChairpersonView, setAllowChairpersonView] = useState("Yes");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPIN, setUpdatedPIN] = useState("");
  const [updatedTelephone, setUpdatedTelephone] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedAllowChairpersonView, setUpdatedAllowChairpersonView] =
    useState("Yes");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setUpdatedName(name);
    setUpdatedPIN(pin);
    setUpdatedTelephone(telephone);
    setUpdatedEmail(email);
    setUpdatedAllowChairpersonView(allowChairpersonView);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      setShowChangePassword(false);
      // Update password logic
      console.log("Password changed successfully!");
    }
  };
  const handleSave = () => {
    setIsEditing(false);
    setName(updatedName);
    setPIN(updatedPIN);
    setTelephone(updatedTelephone);
    setEmail(updatedEmail);
    setAllowChairpersonView(updatedAllowChairpersonView);
    // Update settings logic
    console.log("Settings saved successfully!");
  };

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const generateRandomNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Set initial values for non-editable fields
  useState(() => {
    setName(generateRandomString());
    setTelephone(generateRandomNumber());
  }, []);

  return (
    <div>
      <div className="settings-menu">
        <h2>Settings</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <span style={{ textAlign: "left" }}>Web Account: </span>
            <span style={{ textAlign: "left" }}>{name}</span>
          </li>
          <li>
            <span style={{ textAlign: "left" }}>Phone Account: </span>
            <span style={{ textAlign: "left" }}>{telephone}</span>
          </li>
          <li>
            <span style={{ textAlign: "left" }}>Name: </span>
            {isEditing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              <span style={{ textAlign: "left" }}>{name}</span>
            )}
          </li>
          <li>
            <span style={{ textAlign: "left" }}>PIN: </span>
            {isEditing ? (
              <input
                type="text"
                value={updatedPIN}
                onChange={(e) => setUpdatedPIN(e.target.value)}
              />
            ) : (
              <span style={{ textAlign: "left" }}>{pin}</span>
            )}
          </li>
          <li>
            <span style={{ textAlign: "left" }}>Telephone: </span>
            {isEditing ? (
              <input
                type="text"
                value={updatedTelephone}
                onChange={(e) => setUpdatedTelephone(e.target.value)}
              />
            ) : (
              <span style={{ textAlign: "left" }}>{telephone}</span>
            )}
          </li>
          <li>
            <span style={{ textAlign: "left" }}>Email: </span>
            {isEditing ? (
              <input
                type="text"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            ) : (
              <span style={{ textAlign: "left" }}>{email}</span>
            )}
          </li>
          <li>
            <span style={{ textAlign: "left" }}>
              Allow conference chairperson to view personal contacts:{" "}
            </span>
            {isEditing ? (
              <select
                value={updatedAllowChairpersonView}
                onChange={(e) => setUpdatedAllowChairpersonView(e.target.value)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <span style={{ textAlign: "left" }}>{allowChairpersonView}</span>
            )}
          </li>
          <li>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={toggleEditing}>Edit Details</button>
            )}
          </li>
          <li>
            <button onClick={handleChangePassword}>Change Password</button>
          </li>
        </ul>
      </div>
      {showChangePassword && (
        <div className="password-change-popup">
          <h2>Change Password</h2>
          <label>
            Enter Current Password:
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            <button onClick={toggleShowCurrentPassword}>
              {showCurrentPassword ? "Hide" : "Show"}
            </button>
          </label>
          <label>
            Enter New Password:
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button onClick={toggleShowNewPassword}>
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </label>
          <label>
            Confirm New Password:
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </label>
          {passwordMatchError && <p>The passwords do not match</p>}
          <button onClick={handlePasswordSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default Settings;
