"use client";

import Image from "next/image";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Token } from "@/lib/types";
import TokenValueInput from "@/components/token-value-input";
import calculate, { getRandom } from "@/lib/utils";
import TokenSelector from "@/components/token-selector";

const BASE_URL = "https://interview.switcheo.com/prices.json";

export default function Home() {
  const [fetchedData, setFetchedData] = useState([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [fromTokenValue, setFromTokenValue] = useState<string>("0.0");
  const [toToken, setToToken] = useState<Token | null>(null);
  const [toTokenValue, setToTokenValue] = useState<string>("0.0");
  // whether the fromTokenValue was previous updated by user input or thru another method
  const [isFromTokenUpdatedByUserInput, setIsFromTokenUpdatedByUserInput] =
    useState<boolean>(false);

  const [isToTokenUpdatedByUserInput, setIsToTokenUpdatedByUserInput] =
    useState<boolean>(false);

  // Data fetching
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error in fetching data");
      })
      .then((data) => {
        const filteredData = data.filter(
          (token: Token, index: number, self: Token[]) =>
            index ===
            self.findIndex((v: Token) => v.currency === token.currency)
        );
        setFetchedData(filteredData);

        let min: number = 0;
        let max: number = filteredData.length;

        setFromToken(filteredData[getRandom(min, max)]);
        setToToken(filteredData[getRandom(min, max)]);
      });
  }, []);

  // intended: update toTokenValue only when fromTokenValue is changed by user input
  useEffect(() => {
    if (fromToken && toToken && isFromTokenUpdatedByUserInput) {
      setIsToTokenUpdatedByUserInput(false);
      setToTokenValue(
        calculate(fromTokenValue, fromToken.price, toToken.price)
      );
    }
  }, [fromTokenValue, fromToken, toToken, isFromTokenUpdatedByUserInput]);

  // intended: update fromTokenValue only when toTokenValue is changed by user input
  useEffect(() => {
    if (fromToken && toToken && isToTokenUpdatedByUserInput) {
      setIsFromTokenUpdatedByUserInput(false);
      setFromTokenValue(
        calculate(toTokenValue, toToken.price, fromToken.price)
      );
    }
  }, [toTokenValue, fromToken, toToken, isToTokenUpdatedByUserInput]);

  return (
    <main className="flex min-h-screen flex-col px-4 py-16 space-y-6">
      <h1 className="text-2xl font-bold text-center">Swap token</h1>
      <Card>
        <CardContent className="space-y-3">
          <div id="from-token" className="flex gap-3">
            <TokenSelector
              data={fetchedData}
              selectedToken={fromToken}
              setSelectedToken={setFromToken}
            />
            <TokenValueInput
              value={fromTokenValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const PATTERN = new RegExp("^[0-9]*[.,]?[0-9]*$");
                if (!PATTERN.test(e.target.value)) {
                  return;
                }
                setIsFromTokenUpdatedByUserInput(true);
                if (fromToken && toToken) {
                  setFromTokenValue(e.target.value);
                  setToTokenValue(
                    calculate(fromTokenValue, fromToken.price, toToken.price)
                  );
                }
              }}
            />
          </div>
          <div id="to-token" className="flex space-x-3">
            <TokenSelector
              data={fetchedData}
              selectedToken={toToken}
              setSelectedToken={setToToken}
            />
            <TokenValueInput
              value={toTokenValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const PATTERN = new RegExp("^[0-9]*[.,]?[0-9]*$");
                if (!PATTERN.test(e.target.value)) {
                  return;
                }

                setIsToTokenUpdatedByUserInput(true);

                if (fromToken && toToken) {
                  setToTokenValue(e.target.value);
                  setFromTokenValue(
                    calculate(toTokenValue, toToken.price, fromToken.price)
                  );
                }
              }}
            ></TokenValueInput>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
