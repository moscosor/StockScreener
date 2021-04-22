//SMA
// close = close array
// period = short(15) or long(50)
export function sma(close, period){
    var sma = close.map((val, index) => {
        if(index < period - 1) {
            val = null
            return val;
        }
        else {
            val = close.slice((index + 1) - period ,(index + 1));
            val = avg(val)
            return val;
        }
    },0)
    return sma;
};

//Average
// vals = array of nums
export function avg(vals){
    var sum = vals.reduce((total, curVal) => {return total + curVal},0);
    var avg = sum/vals.length;
    return avg;
};
