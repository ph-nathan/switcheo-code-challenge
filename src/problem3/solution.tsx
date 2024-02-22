import React, { useEffect, useMemo, useState } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

enum BlockChainPriority {
  Osmosis = 100,
  Ethereum = 50,
  Arbitrum = 30,
  Zilliqa = 20,
  Neo = 20,
}
const INVALID_PRIORITY = -99;

class Datasource {
  private source: string = "";

  constructor(source: string) {
    this.source = source;
  }

  public getPrices: Promise<Prices> = async () => {
    try {
      const response = await fetch(this.source);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

interface Props extends BoxProps {}

type Prices = Record<string, number>;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<Prices>({});

  useEffect(() => {
    const datasource = new Datasource(
      "https://interview.switcheo.com/prices.json"
    );
    datasource.getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getPriority = (blockchain: string): number => {
    if (!BlockChainPriority[blockchain]) return INVALID_PRIORITY;
    return BlockChainPriority[blockchain];
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > INVALID_PRIORITY && balance.amount <= 0)
          return true;
        return false;
      })
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances, prices]);

  const rows = sortedBalances
    .map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    })
    .map((balance: FormattedWalletBalance, index: number) => {
      if (!prices[balance.currency]) return null;
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;