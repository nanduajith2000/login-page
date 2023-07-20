import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles((theme) => ({
  ringingIcon: {
    animation: "$ring 0.5s ease-in-out infinite alternate",
  },
  "@keyframes ring": {
    from: {
      transform: "rotate(20deg)",
    },
    to: {
      transform: "rotate(-20deg)",
    },
  },
}));

const RingingCallIcon = () => {
  const classes = useStyles();
  const [isRinging, setIsRinging] = React.useState(false);

  const handleToggleRinging = () => {
    setIsRinging((prev) => !prev);
  };

  return (
    <IconButton onClick={handleToggleRinging}>
      <PhoneIcon className={isRinging ? classes.ringingIcon : ""} />
    </IconButton>
  );
};

export default RingingCallIcon;
