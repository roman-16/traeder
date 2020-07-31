import { mean } from 'mathjs';
import binance, { TradeData } from './binance';
import { fixSizedQueue } from './helpers';

const tradeData = fixSizedQueue<TradeData>(100);

console.log(binance);

// binance.onTrade('ETHUSDT', (data) => {
//   tradeData.add(data);

// console.log(tradeData.values.length);
// });
