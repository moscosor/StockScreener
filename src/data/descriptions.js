export const stratDescriptions = {
    morningGapScan: "The Morning Gap Strategy  takes advantage of inefficiencies in the way the price of an equity is calculated at market open. This scan checks if there is a gap between 2% and 10% from the previous market close to the market open.",
    rsiScan: "The RSI Strategy is used to signal when an equity is overbought or oversold.",
    momentumGapScan: "The Momentum Gap Strategy is used to indicate a potential trend change. When at a breakout point a gap indicates the start of a strong trend. When it occurs in the middle of a trend it is a strong sign of a reversal. The strategy requires a gap between any two candles that has significantly more volume and is a gap that is greater than 8%.",
    aboveMovingAverageScan: "The Above Moving Average Strategy if the price is above the moving average and how many bars ago the price crossed over the moving average. This helps indicate whether or not the equity is in an upward trend.",
    movingAverageScan: "The Moving Average Crossover Strategy compares the 13 period moving average to the 50 period moving average. A buy signal can be seen when the 13 period Moving Average crosses above the 50 period moving average in a trending market."
};
export const stratResultDescriptions = {
    morningGapRes: "Note this strategy shouldn’t be used when there has been news, earnings, or other influences on the opening price. Returns the % change between the previous day's close and this morning's open. If red, there was a gap down and a long position should be taken. If green, there was a gap up and a short position should be taken. If false then a morning gap did not occur",
    momentumGapRes: "Returns the % change from the previous candle close and current candles open. If there was a negative percent change then there was a gap down, if theres a positive percent change there was a gap up. If false then a momentum gap did not occur",
    aboveMovingAverageRes: "Returns the number of ticks the price has been above the moving average. Tick = Current Time Interval",
    movingAverageRes: "If strategy is not applicable then returns N/A in orange. If the moving average crossover accrued more than 9 bars ago then it will indicate it is 'Too Irrelevant'. If a moving average is applicable then it returns the number of ticks the small moving average has been above the large moving average and a long position is recommended.",
    rsiRes: "If RSI is above 70 you should take a short position. If RSI is below 30 then you should take a long position."
}
