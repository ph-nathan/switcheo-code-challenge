"use client";

import Card from "@mui/material/Card";
import { CardContent, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Token } from "@/lib/types";
import TokenValueInput from "@/components/token-value-input";
import calculate, { getRandom } from "@/lib/utils";
import TokenSelector from "@/components/token-selector";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import IconButton from "@mui/material/IconButton";
import SwapButton from "@/components/swap-button";
import { BASE_URL } from "@/lib/utils";

export default function Home() {
  const [fetchedData, setFetchedData] = useState([]);
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
  // Data fetching
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => {
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
    <main className="flex justify-center min-h-screen mx-auto max-w-[70%] lg:max-w-[45%] flex-col px-4 py-16 space-y-6 ">
      {isSwitch ? (
        <>
          <div
            className="bg-[#a0c1fb] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[5rem] sm:w-[68.75rem]
        dark:bg-[#676394] animate-blob"
          ></div>
          <div
            className="bg-[#fbe2e3] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[5rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2x1:left-[-5rem]
        dark:bg-[#946263] animate-blob"
          />
        </>
      ) : (
        <>
          <div
            className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[5rem] sm:w-[68.75rem]
        dark:bg-[#946263] animate-blob"
          ></div>
          <div
            className="bg-[#a0c1fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[5rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2x1:left-[-5rem]
        dark:bg-[#676394] animate-blob"
          ></div>
        </>
      )}
      <Paper
        elevation={3}
        className="text-2xl sm:text-2xl font-bold text-center opacity-75 rounded-md sm:w-[50%] mx-auto p-3 "
      >
        Token Swapper
      </Paper>
      <Card className="rounded-lg opacity-90 shadow-lg">
        <CardContent className="flex flex-col gap-3">
          <span className="font-bold">From:</span>
          <div id="from-token" className="flex gap-3">
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
            <TokenSelector
              data={fetchedData}
              selectedToken={fromToken}
              setSelectedToken={setFromToken}
            />
          </div>
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
          <span className="font-bold">To:</span>
          <div id="to-token" className="flex space-x-3">
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
            />
            <TokenSelector
              data={fetchedData}
              selectedToken={toToken}
              setSelectedToken={setToToken}
            />
          </div>
        </CardContent>
      </Card>
      <SwapButton
        fromToken={fromToken}
        fromTokenValue={fromTokenValue}
        toToken={toToken}
        toTokenValue={toTokenValue}
      />
      <Card className="p-3 text-md w-full h-15 font-roboto rounded-md mx-auto text-center bg-gray-50">
        {fromToken && toToken ? (
          <>
            <div className="font-bold">Exchange Rate</div>
            <div>
              1 {fromToken.currency} ={" "}
              {(fromToken.price / toToken.price).toString()} {toToken.currency}
            </div>
          </>
        ) : (
          <div>Select your Tokens to swap.</div>
        )}
      </Card>
    </main>
  );
}
