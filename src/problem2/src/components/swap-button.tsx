import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Token } from "@/lib/types";
import toast from "react-hot-toast";

type SwapButtonProps = {
  fromToken: Token | null;
  fromTokenValue: string;
  toToken: Token | null;
  toTokenValue: string;
};

export default function SwapButton({
  fromToken,
  fromTokenValue,
  toToken,
  toTokenValue,
}: SwapButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSwap = () => {
    setOpen(false);
    toast.success("Successfully swapped two tokens");
  };

  return (
    <>
      {/* this questionable wrapping of button around Button is needed because the Button MUI element
       only the "&" background color attribute is broken and now is 3am already */}

      <button
        className="shadow-md w-full text-white bg-blue-500 hover:bg-blue-400 disabled:bg-gray-300 rounded-lg py-3 disabled:text-gray-500 duration-300 transition-colors ease-in-out"
        onClick={handleClickOpen}
        disabled={
          Number(fromTokenValue) == 0 ||
          Number(toTokenValue) == 0 ||
          !fromTokenValue ||
          !toTokenValue ||
          !fromToken ||
          !toToken
        }
      >
        Swap
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: "520px",
            height: "auto",
            position: "relative",
            borderRadius: "1rem",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Confirm swap?</DialogTitle>
        <DialogContent className="flex flex-col items-center gap-5">
          <h2 className="text-black text-xl text-center">
            {fromTokenValue} {fromToken?.currency} to {toTokenValue}{" "}
            {toToken?.currency}
          </h2>
          <p className="text-red-600 text-base">This action is irreversible</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSwap} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
