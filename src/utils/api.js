


const exchangeIDs = [
    "binance",
    "bitfinex",
    "exmo",
    "ftx",
    "gateio",
    "hitbtc",
    "huobi",
    "kraken",
    "kucoin",
    "okcoin",
    "okex",
    "poloniex",
    "yobit",
];

const exchanges = exchangeIDs.map(id => new ccxt[id]());

const timedCache = (f) => {
    values = {}
    const wrapper = async (pair) => {
        let pairStr = pair.join("/");
        if (pairStr in values) {
            if values[pairStr].ts > Date.now() {
                return {...values[pair].value, cached: true}
            }
            let value = await f(pair);
            values[pair] = {ts: Date.now() + 3600 * 1000, value: value}
            return {...value, cached: false}
        }
    }
    return wrapper;
}


const genGetter = (exchange) => {
    let getter = async (pair, isReversed = false) => {
        let orders = await exchange.fetchOrderBook(symbol);
        let result = {};
        ["bids", "asks"].map(
            key => {
                result[key] = orders[key].map(
                    order => ({
                        price: order[0], 
                        amount: order[1], 
                        exchange: exchange.id
                    })
                ).sort(a, b => a.amount - b.amount)
                if (key == "bids") {
                    result[key].reverse();
                }
            }
        )
        return result;
    }
    return timedCache(getter);
}


const getters = exchanges.map(exchange => genGetter(exchange));


const getOrders = async (pair) => {
    let orders = {
        bids: [],
        asks: [],
    };

    getters.map(getter => {
        let cexOrders = await getter(pair);
        orders.bids.push(...cexOrders.bids);
        orders.asks.push(...cexOrders.asks);
    });

    ["bids", "asks"].map(
        key => {
            orders[key].sort(a, b => a.price - b.price)
        }
    );
    return orders;
}


const fillOrders = async (pair, amount) => {
    let filled = {
        bids: [],
        asks: [],
    };
    orders = await getOrders(pair);

    ["bids", "asks"].map(
        key => {
            let filledAmount = 0;
            orders[key].map(
                order => {
                    if (filledAmount > amount) {
                        return
                    }

                    if (filledAmount + order.amount >= amount) {
                        filled[key].push({...order, amount: amount - filledAmount});
                    } else {
                        filled[key].push(order);
                    }
                    filledAmount += order.amount
                }
            )
        }
    )
    return filled;
}


const composePrices = (orderList) => {
    let exchanges = {};
    orderList.map(
        order => {
            if (!(order.exchange in exchanges)) { exchanges[order.exchange] = [] };
            exchanges[order.exchange].push(order)
        }
    )
    let result = {};
    exchanges.entries().map(
        ([exchange, value]) => {
            result[exchange] = calcPrices(value)
        }
    )
}


const calcPrices = (orderList) => {
    let amount = orderList.reduce(a, b => a + b.amount, 0);
    let fullPrice = orderList.reduce((a, b) => a + b.price * b.amount);
    let price = fullPrice / amount;
    return {amount: amount, price: price, fullPrice: fullPrice};
}

const getPrices = async (pair, amount) => {
    filled = await fillOrders(pair, amount)
    let result = {};
    ["bids", "asks"].map(
        key => { result[key] = {...calc_prices(filled[key]), exchanges: composePrices(filled[key])} }
    )
    return result;
}


const updateExchange = (pair, i) {
    if (0 <= i && i < getters.length) {
        return {
            next: (!(await getters[i](pair)).cached && i + 1 < exchanges.length) ? {
                name: exchanges[i + 1].name,
                index: i + 1,
            } : null
        }
    } else {
        return null;
    }
}

export { getPrices, updateExchange };