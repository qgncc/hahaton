import React from 'react'
import { useState } from 'react'
import Accordion from './Accordion'
import {UilArrowRight} from "@iconscout/react-unicons"
import hardPairs from './pairs.js'


import './App.css';


async function updateExchange(pair, i){
    let a = await fetch(`http://hurly.ru/update/${pair[0]}/${pair[1]}?i=${i}`);
    let b = a.json();
    return b;
}
async function getPrices(pair,amount){
    let a = await fetch(`http://hurly.ru/retrieve/${pair[0]}/${pair[1]}?amount=${amount}`);
    let b = a.json();
    return b;
}


function Input ({setAmount, ...props}) {
    return (
        <input style={{textAlign:'right'}} className="input t-input" type="numeric" onChange={
            (event) => (setAmount(parseInt(event.target.value)))
        }
        />
    )
}
function Currency({pair, pairs, values, label, selected, setPair, setPairs, index, ...props}) {
    return(
        <select id="currency" className="select t-select" onChange={(event)=>{
            setPair(pair.map(
                (e,i) => (i === index? event.target.value: e)
            ));
            setPairs(hardPairs.filter( (l,k) => l[k] == pair[k]))
        }}>
            {
                pairs.map(
                    e => <option selected={selected === e[index]} value={e[index]}>{e[index]}</option>
                )

            }


        </select>
    );
}


function unpack(obj) {
    return <React.Fragment>
        {
            Object.entries(obj.exchanges).map(
                ([key, value]) => <div>
                    {value.name}: {value.amount.toFixed(8)} @ {value.price.toFixed(8)}
                </div>
            )
        }
    </React.Fragment>
}







function App() {
    const [pair, setPair] = useState(["BTC","USDT"]);
    const [amount, setAmount] = useState(0);
    const [hasResult, setHasResult] = useState(false);
    const [result, setResult] = useState(0);
    const [pairs, setPairs] = useState(hardPairs)

    const values = [
        "ZRX", "BAT", "1INCH", "DYDX", "SUSHI" , "USDT", "BTC","BNB","ADA","SOL","XRP","DOT","SHIB","DOGE","USDC","LUNA","UNI","WBTC","AVAX","LINK",
        "BUSD","LTC","MATIC","ALGO","BCH","XLM","AXS","VET","ATOM","ICP","THETA","TRX","FIL","ETC","FTT","FTM","DAI","BTCB","MANA","HBAR","XTZ",
        "CRO","NEAR","EGLD","XMR","EOS","GRT","FLOW","CAKE","AAVE","KLAY","MIOTA","RUNE","XEC","QNT","ONE","LEO","BSV","KSM",
        "NEO","HNT","WAVES","UST","CHZ","BTT","MKR","ZEC","STX","ENJ","COMP","CELO","DASH","AMP","TFUEL",

    ];



    return (
        <div className="wrapper t-wrapper">
            <div className="card t-card">
                <h1 className="title t-title">Neptune Foundation</h1>
                <div className="form">
                    <Input setAmount = {setAmount}/>
                    <Currency pair={pair} setPair={setPair} pairs={pairs} setPairs={setPairs} values={values} label="$" selected={"BTC"} index={0}/>
                    <span className="text">/</span>
                    <Currency pair={pair} setPair={setPair} pairs={pairs} setPairs={setPairs} values={values} label="$" selected={"USDT"} index={1}/>
                    <button className="submit t-submit" type="submit" value="Calc" onClick={async () =>{

                        setResult(await getPrices(pair, amount));
                        setHasResult(true);
                    } }><UilArrowRight/></button>
                </div>

                {hasResult?(<div id="result" className="result-wrapper">
                    <div><span>Рыночная цена: </span><span>{((result.bids.price + result.asks.price) / 2).toFixed(8)}</span></div>

                    <Accordion value= {result.bids.price.toFixed(8)} title="Продажа" id="accordion-1">
                        {unpack(result.bids)}
                    </Accordion>
                    <Accordion value={result.asks.price.toFixed(8)} title="Покупка" id="accordion-1">
                        {unpack(result.asks)}
                    </Accordion>
                </div>): null}
            </div>
        </div>
    );
}


export default App;

