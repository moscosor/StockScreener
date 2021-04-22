import {sma} from './Indicators'; 

/*Morning Gap Strategy
Takes the last open and close and finds the percent change.
if the percent chage is greater than 2% and smaller than 10%
it returns the percent change
*/ 
export function morningGap(close, open){
    close = close[1];
    open = open[0];
    if(open > close){
        var increase = open-close;
        var increasePercent = (increase/close)*100;
        if (increasePercent >= 2 && increasePercent <= 10){
            return +increasePercent.toFixed(2);
        }
        else {
            return false
        }
    }
    if(open < close){
        var decrease = close - open;
        var decreasePercent = (decrease/close)*100;
        if (decreasePercent >= 2 && decreasePercent <= 10){
            return -decreasePercent.toFixed(2);
        }
        else {
            return false
        }

    }
}

/*Momentum gap
Takes last open and close and close and finds percent change
Finds percent change in last two volume
If price change is greater than 5% and volume is greater than 50%
then return price change
*/
export function momentumGap(close, open, vol){
    close = close[1];
    open = open[0];
    var volIncrease;
    vol = vol.slice(0, 2);
    if(open > close){
        var priceIncrease = open-close;
        priceIncrease = (priceIncrease/close)*100;
        volIncrease = vol[0] - vol[1];
        volIncrease = (volIncrease/vol[0])*100;
        if (priceIncrease >= 8 && volIncrease > 50){
            return +priceIncrease.toFixed(2);
        }
        else {
            return false
        }
    }
    else if(open < close){
        var priceDecrease = open-close;
        priceDecrease = (priceDecrease/close)*100;
        volIncrease = vol[0] - vol[1];
        volIncrease = (volIncrease/vol[0])*100;;
        if (priceDecrease >= 8 && volIncrease > 50){
            return -priceDecrease.toFixed(2);
        }
        else {
            return false
        }
    }
}


/*Moving Average Scan
Check if price is above a given SMA (could use 20, 50, 13, etc)
*/
// price = current stock price array
// period = short(13)
export function aboveMovingAverage(price, period){
    // let priceRev = price.reverse();  // old -> curr
    price = price.reverse();
    let ticks = 0;
    var ma = sma(price, period);
    for(let i = price.length - 1; i >= 0; i--){
        
        if(price[i] > ma[i]){
            ticks++;
        }
        else{
            if(ticks < 1){
                return ["N/A", price[i + 1], ma[i + 1]];
            } else{
                return [ticks, price[i + 1], ma[i + 1]];
            }
        }
    }
    return false;
}


/*Bullish moving Average Crossover scan
Checks to see if a shorter period moving average has recently crossed 
over a longer period moving average
Example: 13 period moving average now above 50 period indicating reversal
*/
// price = close price array
// periodSmall = small #
// periodLarge = big #
export function movingAverageCrossover(price, periodSmall, periodLarge){
    var smaSmall = sma(price, periodSmall);
    var smaLarge = sma(price, periodLarge);
    let ticks = 0;
    let prevI = smaSmall.length - 1;
    
    for(let i = smaSmall.length - 1; i >= 0; i--){
        if(smaLarge[smaLarge.length - 1] > smaSmall[smaLarge.length - 1]){
            return "N/A";
        }
        if(smaSmall[i] > smaLarge[i] && prevI === i){
            prevI--;
            ticks++;
        }
    }
    if(ticks > 0 && ticks <= 9){
        return ticks;
    }
    else{
        return "Too Irrelevant"
    }
    
}