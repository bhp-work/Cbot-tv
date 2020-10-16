import { makeApiRequest, generateSymbol, parseFullSymbol } from "./helpers.js";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming.js";

const lastBarsCache = new Map();
const configurationData = {
  //supported_resolutions: ["1D", "1W", "1M"],
  supported_resolutions: [
    "1s",
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "120",
    "240",
    "1D",
    "1W",
    "1M",
  ],
  exchanges: [
    {
      value: "Bitfinex",
      name: "Bitfinex",
      desc: "Bitfinex",
    },
    {
      value: "BitTrex",
      name: "BitTrex",
      desc: "BitTrex",
    },
    {
      value: "Coinbase",
      name: "Coinbase",
      desc: "Coinbase",
    },
    {
      value: "bitcoincom",
      name: "Bitcoin.com",
      desc: "Bitcoin.com",
    },
    {
      value: "Binance",
      name: "Binance",
      desc: "Binance",
    },
    {
      // `exchange` argument for the `searchSymbols` method, if a user selects this exchange
      value: "Poloniex",

      // filter name
      name: "Poloniex",

      // full exchange name displayed in the filter popup
      desc: "Poloniex",
    },
    {
      value: "Kraken",
      name: "Kraken",
      desc: "Kraken bitcoin exchange",
    },
  ],
  symbols_types: [
    {
      name: "crypto",

      // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
      value: "crypto",
    },
    // ...
  ],

};

async function getAllExchanges() {
  const data = await makeApiRequest("data/v3/all/exchanges");
  let exchangeList = [];
  exchangeList = Object.keys(data.Data).map((key) => {
    return {
      name: key,
      value: key,
      desc: key,
    };
  });
  return exchangeList;
}

async function getAllSymbols() {
  const data = await makeApiRequest("data/v3/all/exchanges");
  let allSymbols = [];

  for (const exchange of configurationData.exchanges) {
    const pairs = data.Data[exchange.value].pairs;

    for (const leftPairPart of Object.keys(pairs)) {
      const symbols = pairs[leftPairPart].map((rightPairPart) => {
        const symbol = generateSymbol(
          exchange.value,
          leftPairPart,
          rightPairPart
        );
        return {
          symbol: symbol.short,
          full_name: symbol.full,
          description: symbol.short,
          exchange: exchange.value,
          type: "crypto",
        };
      });
      allSymbols = [...allSymbols, ...symbols];
    }
  }
  return allSymbols;
}

export default {
  onReady: (callback) => {
    console.log("[onReady]: Method call");
    // getAllExchanges().then((result) => {
    //   configurationData.exchanges = result;
    //   console.log(configurationData);
    //   callback(configurationData);
    // });
    callback(configurationData);
  },

  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    console.log("[searchSymbols]: Method call");
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName,exchange);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(
      ({ full_name }) => full_name === symbolName
    );
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName,exchange);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }
    const symbolInfo = {
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
     // timezone: "Etc/UTC",
      exchange: symbolItem.exchange,
      minmov: 1,
      //currency_code: symbolItem.quoteAsset,
       has_no_volume: true,
      has_weekly_and_monthly: true,
      supported_resolutions: configurationData.supported_resolutions,
       volume_precision: 2,
       data_status: "streaming",
       has_intraday: true,
       intraday_multipliers: ["1", "60"],
       pricescale: 100,
 
       
     
    };

    console.log("[resolveSymbol]: Symbol resolved", symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) => {
    console.log("[getBars]: Method call", symbolInfo, resolution, from, to);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    const urlParameters = {
      e: parsedSymbol.exchange,
      fsym: parsedSymbol.fromSymbol,
      tsym: parsedSymbol.toSymbol,
      toTs: to,
      limit: 2000,
    
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join("&");
    try {
      console.log(resolution);
      var histoQuery="histoday?";
      if (resolution.match(/^(1|3|5|15|30)$/)) {
        histoQuery="histominute?&aggregate="+resolution+"&";
      }
    
      else if (resolution.match(/^(60|120|240)$/)) {

        histoQuery="histohour?&aggregate="+(resolution==60?1:(resolution==120?2:(resolution==240?4:1)))+"&";
      }
      else if (resolution.match(/^(1D|1W|1M)$/)) {

        histoQuery="histoday?&aggregate="+(resolution=="1D"?1:(resolution=="1W"?7:(resolution=="1M"?30:1)))+"&";
      }
     
     
     // console.log("Test"+resolution);
     // console.log(`data/${histoQuery}${query}`);
      const data = await makeApiRequest(`data/${histoQuery}${query}`);
      if (
        (data.Response && data.Response === "Error") ||
        data.Data.length === 0
      ) {
        // "noData" should be set if there is no data in the requested period.
        onHistoryCallback([], {
          noData: true,
        });
        return;
      }
      let bars = [];
      data.Data.forEach((bar) => {
        if (bar.time >= from && bar.time < to) {
          bars = [
            ...bars,
            {
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
            },
          ];
        }
      });
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...bars[bars.length - 1],
        });
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, {
        noData: false,
      });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscribeUID:",
      subscribeUID
    );
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );
  },

  unsubscribeBars: (subscriberUID) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID
    );
    unsubscribeFromStream(subscriberUID);
  },
};

