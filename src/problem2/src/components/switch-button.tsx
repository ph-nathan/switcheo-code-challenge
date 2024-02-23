import IconButton from "@mui/material/IconButton";
import SwapVertIcon from "@mui/icons-material/SwapVert"
import React from "react";

export default function SwitchButton({
  handleSwitch,
}: {
  handleSwitch: () => void;
}) {
  return (
    <div className="mx-auto mt-9">
      <IconButton
        size="medium"
        onClick={handleSwitch}
        sx={{
          borderRadius: "90%",
          mx: "auto",
          "&": {
            padding: "0px",
          },
        }}
      >
        <SwapVertIcon sx={{ width: "100px", height: "60px" }} />
      </IconButton>
    </div>
  );
}
