"use client";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";
import { Token } from "@/lib/types";
import Avatar from "@mui/material/Avatar";
import { AppBar, DialogContent, Toolbar } from "@mui/material";

type TokenSelectorDialogProps = {
  isOpen: boolean;
  selectedToken: Token | null;
  handleClose: (value: Token | null) => void;
  tokens: Token[];
};

type TokenSelectorProps = {
  data: Token[];
  selectedToken: Token | null;
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
};

function TokenSelectorDialog({
  isOpen,
  selectedToken,
  handleClose,
  tokens,
}: TokenSelectorDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter((token) =>
    token.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Dialog
      className="flex flex-col max-h-[80%] overflow-y-scroll no-scrollbar m-auto"
      onClose={() => handleClose(selectedToken)}
      open={isOpen}
      PaperProps={{
        style: {
          width: "500px",
          height: "600px",
          position: "relative",
          borderRadius: "1rem",
        },
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <div className="font-roboto">Select Token</div>
          <Button
            className="absolute top-3 right-0 "
            color="inherit"
            onClick={() => handleClose(selectedToken)}
          >
            X
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent className="flex flex-col gap-y-3 py-2">
        <div className="flex flex-col pt-2">
          <input
            className="border font-roboto pl-2 rounded-lg h-8"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredTokens.length === 0 ? (
          <div className="pl-2 font-roboto text-center">
            <h2 className="text-zinc-500 text-xl">No token found.</h2>
            <p className="text-zinc-300 text-base">Looks like this token doesn&apos;t exist.</p>
          </div>
        ) : (
          filteredTokens.map((token: Token, index: number) => (
            <div key={index}>
              <Button
                className="w-full flex justify-start px-2 py-1 h-fit rounded-lg"
                variant="outlined"
                onClick={() => {
                  handleClose(token);
                }}
              >
                <Avatar
                  className="w-8 h-8 mr-2"
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                  alt={token.currency}
                />
                <div className="flex flex-col justify-start items-start">
                  <span className="">{token.currency}</span>
                  <span className="">${token.price}</span>
                </div>
              </Button>
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function TokenSelector({
  data,
  selectedToken,
  setSelectedToken,
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (value: Token | null) => {
    setIsOpen(false);
    setSelectedToken(value);
  };

  return (
    <>
      <Button
        className="flex items-center rounded-md text-sm w-100"
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        {selectedToken ? (
          <>
            <Avatar
              className="w-6 h-6 mr-2"
              
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken.currency}.svg`}
              alt={selectedToken.currency}
            >
            </Avatar>
            {selectedToken.currency}
          </>
        ) : (
          "Select Token"
        )}
      </Button>
      <TokenSelectorDialog
        tokens={data}
        selectedToken={selectedToken}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}
