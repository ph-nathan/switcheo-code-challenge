import { Token } from "@/lib/types";
import React from "react";

type TokenInputProps = {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
};

export default function TokenValueInput({ value, onChange }: TokenInputProps) {
  return (
    <>
      <input
        className="w-full border rounded-md pl-3"
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder="0.0"
        inputMode="decimal"
        value={value}
        onChange={onChange}
      />

    </>
  );
}
