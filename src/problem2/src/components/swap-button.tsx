import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Token } from "@/lib/types";
import toast from "react-hot-toast";
import Avatar from "@mui/material/Avatar";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

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
        className="shadow-md w-full text-white bg-blue-500 hover:bg-blue-400 disabled:bg-gray-300 rounded-xl py-3 disabled:text-gray-500 duration-300 transition-colors ease-in-out"
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
        <DialogTitle
          sx={{
            backgroundColor: "rgb(59 130 246)",
            color: "#ffffff",
            py: "15px",
          }}
          id="alert-dialog-title"
        >
          Swap Confirmation
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {fromToken && toToken ? (
            <div className="pt-8 pb-3 flex items-center gap-x-3">
              <Avatar
                sx={{ width: "32px", height: "32px" }}
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
                  fromToken.currency
                }.svg`}
                alt={fromToken.currency}
              />
              <ArrowRightAltIcon 
              />
              <Avatar
                sx={{ width: "32px", height: "32px" }}
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
                  toToken.currency
                }.svg`}
                alt={toToken.currency}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex text-black text-xl justify-center items-center font-roboto p-4 border rounded-xl border-[#3b82f6]">
            {fromTokenValue} {fromToken?.currency} → {toTokenValue}{" "}
            {toToken?.currency}
          </div>
          <p className="text-red-600 text-base font-roboto bg-red-50 mt-4">
            This action is irreversible
          </p>
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
