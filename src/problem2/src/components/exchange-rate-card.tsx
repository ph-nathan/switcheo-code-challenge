import { Token } from "@/lib/types";
import Card from "@mui/material/Card";

export function ExchangeRateCard({
  fromToken,
  toToken,
}: {
  fromToken: Token | null;
  toToken: Token | null;
}) {
  return (
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
  );
}
