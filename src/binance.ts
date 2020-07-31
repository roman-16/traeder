import Websocket from 'ws';

const getWebsocket = () => {
  const ws = new Websocket('wss://stream.binance.com:9443/ws');

  ws.on('ping', () => console.log(1));
  ws.on('close', () => console.log(2));

  return {
    onOpen: (callback: () => void) => ws.on('open', callback),
    onMessage: (callback: (data: any) => void) => ws.on('message', (data: string) => callback(JSON.parse(data))),
    send: (data: any, callback?: (err?: Error) => void) => ws.send(JSON.stringify(data), callback),
  };
};

const ws = getWebsocket();
const ids = {
  LIST_SUBSCRIPTIONS: 1,
  SUBSCRIBE: 2,
};

export interface TradeData {
  price: number;
  quantity: number;
  tradeTime: number;
  isBuyerMarketMaker: boolean;
}

export default {
  onTrade: (symbol: string, callback: (data: TradeData) => void) =>
    ws.onOpen(() => {
      ws.send({
        method: 'LIST_SUBSCRIPTIONS',
        id: ids.LIST_SUBSCRIPTIONS,
      });

      ws.onMessage((data) => {
        const param = `${symbol.toLowerCase()}@aggTrade`;

        if (data.id === ids.LIST_SUBSCRIPTIONS && !data.result.includes(param)) {
          ws.send({
            method: 'SUBSCRIBE',
            id: ids.SUBSCRIBE,
            params: [param],
          });
        }

        if (data.e === 'aggTrade' && data.s === symbol.toUpperCase()) {
          callback({
            price: Number(data.p),
            quantity: Number(data.q),
            tradeTime: data.T,
            isBuyerMarketMaker: data.m,
          });
        }
      });
    }),

  // ws.on('message', (data: string) => {
  //   console.log(JSON.parse(data).p);
  // });
};
