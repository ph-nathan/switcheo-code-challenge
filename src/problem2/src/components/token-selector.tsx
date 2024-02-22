"use client";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";
import { Token } from "@/lib/types";
import Avatar from "@mui/material/Avatar";
import { DialogContent } from "@mui/material";

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
      className="flex flex-col max-h-[75%] overflow-y-scroll no-scrollbar m-auto"
      onClose={() => handleClose(selectedToken)}
      open={isOpen}
      PaperProps={{ style: { width: '400px', height: '500px', position: 'relative' } }} 
    >
      <Button
        style={{ position: 'absolute', top: 0, right: 0 }}
        color="inherit"
        onClick={() => handleClose(selectedToken)}
      >
        X
      </Button>
      <DialogTitle>Select Token</DialogTitle>
      <DialogContent className="flex flex-col gap-y-3 py-2">
        <div className="flex flex-col items-center">
          <input
            className="w-4/5 border"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredTokens.map((token: Token, index: number) => (
          <div key={index}>
            <Button
              className="w-full flex justify-start px-2 py-1 h-fit"
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
        ))}
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
        className="flex items-center rounded-md text-sm"
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
              {/* fallback ava <Avatar src = "/> */}
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
