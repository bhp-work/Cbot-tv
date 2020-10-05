// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
	try {
		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
		return response.json();
	} catch (error) {
		throw new Error(`CryptoCompare request error: ${error.status}`);
	}
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}

// export async function getAllExchange() {
// 	const data = await makeApiRequest("data/v3/all/exchanges");
// 	let exchangeList = Object.values(dataData);
	
// 	console.log("inside helpes.js getAllExchange"+exchangeList);
// 	return exchangeList;	
//   }

export async function getAllExchangesForDropdown() {
	const data = await makeApiRequest("data/v3/all/exchanges");
	let exchangeList = [];

	for (var key in Object.keys(data.Data)) {
		exchangeList.push(Object.keys(data.Data)[key]);
	}

	return exchangeList;	
  }
  
  export async function getAllSymbolPairs(selExchange) {
	
	const data = await makeApiRequest("data/v3/all/exchanges");
	let allSymbols = [];
	const pairs = data.Data[selExchange].pairs;
	//console.log(pairs);
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
	//  console.log(allSymbols);
	return allSymbols;
	//return symbolList;	
  }
  
