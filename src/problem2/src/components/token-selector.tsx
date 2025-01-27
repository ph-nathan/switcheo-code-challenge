"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";
import { Token } from "@/lib/types";
import Avatar from "@mui/material/Avatar";
import { AppBar, DialogContent, Toolbar } from "@mui/material";

type TokenSelectorDialogProps = {
  isOpen: boolean;
  selectedToken: Token | null;
  otherToken: Token | null;
  handleClose: (value: Token | null) => void;
  tokens: Token[];
};

type TokenSelectorProps = {
  data: Token[];
  selectedToken: Token | null;
  otherToken: Token | null
  setSelectedToken: React.Dispatch<React.SetStateAction<Token | null>>;
};

function TokenSelectorDialog({
  isOpen,
  selectedToken,
  otherToken,
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
        <Toolbar className="flex justify-between">
          <div className="font-roboto text-lg ">Select Token</div>
          <Button
            sx={{
              "&": {
                position: "absolute",
                right: "0px",
                height: "100%",
              },
            }}
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
            <p className="text-zinc-300 text-base">
              Looks like this token doesn&apos;t exist.
            </p>
          </div>
        ) : (
          filteredTokens.map((token: Token, index: number) => (
            <div className="pt-3" key={index}>
              <Button
                sx={{
                  "&": {
                    paddingTop: "12px",
                  },
                }}
                className="w-full flex flex-col px-2 h-fit rounded-lg"
                variant="outlined"
                disabled = {token.currency === selectedToken!.currency || token.currency === otherToken!.currency}
                onClick={() => {
                  handleClose(token);
                }}
              >
                <Avatar
                  sx={{ width: "32px", height: "32px" }}
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                  alt={token.currency}
                />
                <div className="flex flex-col ">
                  <span className="pt-1.5">{token.currency}</span>
                  <span>${token.price}</span>
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
  otherToken,
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
        className="flex items-center rounded-md text-xs sm:text-sm w-[40%] px-2 "
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        {selectedToken ? (
          <div className="flex px-0.5">
            <div className="hidden sm:block">
              <Avatar
                className="w-6 h-6 mr-2 "
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken.currency}.svg`}
                alt={selectedToken.currency}
              ></Avatar>
            </div>
            <div className="flex flex-wrap items-center">
              <span className="whitespace-nowrap">
                {selectedToken.currency}
              </span>
            </div>
          </div>
        ) : (
          "Select Token"
        )}
      </Button>
      <TokenSelectorDialog
        tokens={data}
        selectedToken={selectedToken}
        otherToken={otherToken}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}
