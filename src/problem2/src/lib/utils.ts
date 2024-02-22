
export default function calculate(fromTokenValue: string, fromTokenPrice: number, toTokenPrice: number) {
    const converted = (Number(fromTokenValue) * fromTokenPrice) / toTokenPrice;
    return converted.toString();
}

export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}