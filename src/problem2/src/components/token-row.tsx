import React from "react";
import TokenValueInput from "./token-value-input";
import TokenSelector from "./token-selector";
import { Token } from "@/lib/types";
import calculate from "@/lib/utils";

type tokenRowProps = {
  thisTokenValue: string;
  fetchedData: Token[]
  thisToken: Token | null;
  otherToken: Token | null;
  setThisToken: React.Dispatch<React.SetStateAction<Token | null>>;
  setThisTokenValue: React.Dispatch<React.SetStateAction<string>>;
  setOtherTokenValue: React.Dispatch<React.SetStateAction<string>>;
  setIsThisTokenUpdatedByUserInput: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TokenRow({
  thisTokenValue,
  fetchedData,
  thisToken,
  otherToken,
  setThisToken,
  setThisTokenValue,
  setOtherTokenValue,
  setIsThisTokenUpdatedByUserInput,
}: tokenRowProps) {
  return (
    <div id="from-token" className="flex gap-3">
      <TokenValueInput
        value={thisTokenValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const PATTERN = new RegExp("^[0-9]*[.,]?[0-9]*$");
          if (!PATTERN.test(e.target.value)) {
            return;
          }
          setIsThisTokenUpdatedByUserInput(true);
          if (thisToken && otherToken) {
            setThisTokenValue(e.target.value);
            setOtherTokenValue(
              calculate(thisTokenValue, thisToken.price, otherToken.price)
            );
          }
        }}
      />
      <TokenSelector
        data={fetchedData}
        selectedToken={thisToken}
        setSelectedToken={setThisToken}
      />
    </div>
  );
}
