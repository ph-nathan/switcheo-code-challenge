"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent, Paper } from "@mui/material";
import SwapButton from "@/components/swap-button";
import GradientBlobs from "@/components/gradient-moving-blobs";
import TokenRow from "@/components/token-row";
import SwitchButton from "@/components/switch-button";
import { ExchangeRateCard } from "@/components/exchange-rate-card";
import calculate, { getRandom } from "@/lib/utils";
import { BASE_URL } from "@/lib/utils";
import { Token } from "@/lib/types";

export default function Home() {
  const [fetchedData, setFetchedData] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [isSwitch, setIsSwitch] = useState<boolean>(false);
  const [fromTokenValue, setFromTokenValue] = useState<string>("0.0");
  const [toToken, setToToken] = useState<Token | null>(null);
  const [toTokenValue, setToTokenValue] = useState<string>("0.0");

  // whether the fromTokenValue was previous updated by user input or thru another method
  const [isFromTokenUpdatedByUserInput, setIsFromTokenUpdatedByUserInput] =
    useState<boolean>(false);

  const [isToTokenUpdatedByUserInput, setIsToTokenUpdatedByUserInput] =
    useState<boolean>(false);

  const initializeData = (url: string) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // error handling in line below adapted from
        // https://stackoverflow.com/questions/40408219/how-to-get-readable-error-response-from-javascript-fetch-api
        return res.text().then((text) => {
          throw new Error(text);
        });
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
        let first: number = getRandom(min, max);
        let second: number;

        do {
          second = getRandom(min, max)
        } while (first === second);

        setFromToken(filteredData[first]);
        setToToken(filteredData[second]);
      })
      .catch((error) => {
        console.log("Error in fetching data: ", error);
      });
  };
  // Data fetching
  useEffect(() => {
    initializeData(BASE_URL);
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

  const handleSwitch = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const tempValue = fromTokenValue;
    setFromTokenValue(toTokenValue);
    setToTokenValue(tempValue);

    setIsToTokenUpdatedByUserInput(false);
    setIsFromTokenUpdatedByUserInput(false);
    setIsSwitch(!isSwitch);
  };

  return (
    <main className="flex justify-center min-h-screen mx-auto max-w-[70%] lg:max-w-[45%] flex-col px-4 pb-16 pt-11 space-y-6 ">
      <GradientBlobs isSwitch={isSwitch} />
      <Paper
        sx={{
          borderRadius: "24px",
        }}
        elevation={3}
        className="text-2xl sm:text-2xl font-bold text-center opacity-75 sm:w-[50%] mx-auto p-3 "
      >
        Token Swapper
      </Paper>
      <Card
        sx={{
          borderRadius: "12px",
          opacity: "0.9",
        }}
      >
        <CardContent className="flex flex-col gap-1">
          <span className="font-bold pl-1">From:</span>
          <TokenRow
            thisTokenValue={fromTokenValue}
            fetchedData={fetchedData}
            thisToken={fromToken}
            otherToken={toToken}
            setThisToken={setFromToken}
            setThisTokenValue={setFromTokenValue}
            setOtherTokenValue={setToTokenValue}
            setIsThisTokenUpdatedByUserInput={setIsFromTokenUpdatedByUserInput}
          />

          <SwitchButton handleSwitch={handleSwitch} />

          <span className="font-bold pl-1">To:</span>
          <TokenRow
            thisTokenValue={toTokenValue}
            fetchedData={fetchedData}
            thisToken={toToken}
            otherToken={fromToken}
            setThisToken={setToToken}
            setThisTokenValue={setToTokenValue}
            setOtherTokenValue={setFromTokenValue}
            setIsThisTokenUpdatedByUserInput={setIsToTokenUpdatedByUserInput}
          />
          
        </CardContent>
      </Card>
      <SwapButton
        fromToken={fromToken}
        fromTokenValue={fromTokenValue}
        toToken={toToken}
        toTokenValue={toTokenValue}
      />
      <ExchangeRateCard fromToken={fromToken} toToken={toToken} />
    </main>
  );
}
