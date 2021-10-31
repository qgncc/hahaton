import React from 'react'
import { useState } from 'react'
import Accordion from './Accordion'
import { UilArrowRight } from "@iconscout/react-unicons"
import { usablePairs, currencies } from './pairs.js'


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
function Currency({pair, pairs, currencies, label, selected, setPair, setPairs, index, ...props}) {
    return(
        <select id="currency" className="select t-select" onChange={(event)=>{
            setPair(pair.map(
                (e,i) => (i === index? event.target.value: e)
            ));
            setPairs(usablePairs.filter( (e, i, arr) => e[i] == pair[i]).filter())
        }}>
            {   //.filter((e, i) => pairs.map(x => x[index]).indexOf(e) == i)
                pairs.map(
                    e => <option selected={selected === e[index]} value={e[index]}>{e[index]}</option>
                )
            }


        </select>
    );
}


function unpack(obj, pair, ctype, amount, price) {
    return <React.Fragment>
        <h3>Чтобы {["купить", "продать"][+(ctype == "bids")]} {amount} {pair[0]} по {price} {pair[1]}, нужно:</h3>
        {
            Object.entries(obj.exchanges).map(
                ([key, value]) => <div className= "text">
                    На <b>{value.name}</b>: {["купить", "продать"][+(ctype == "bids")]} <b>{value.amount.toFixed(8)}</b> по <b>{value.price.toFixed(8)}</b>
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
    const [pairs, setPairs] = useState(usablePairs)


    return (
        <div className="wrapper t-wrapper">
            <div className="card t-card">
                <h1 className="title t-title">Neptune Foundation</h1>
                <div className="form">
                    <Input setAmount = {setAmount}/>
                    <Currency pair={pair} setPair={setPair} pairs={pairs} setPairs={setPairs} currencies={currencies} label="$" selected={"BTC"} index={0}/>
                    <span className="text">/</span>
                    <Currency pair={pair} setPair={setPair} pairs={pairs} setPairs={setPairs} currencies={currencies} label="$" selected={"USDT"} index={1}/>
                    <button className="submit t-submit" type="submit" value="Calc" onClick={async () =>{

                        setResult(await getPrices(pair, amount));
                        setHasResult(true);
                    } }><UilArrowRight/></button>
                </div>

                {hasResult?(<div id="result" className="result-wrapper">
                    <div><span>Рыночная цена: </span><span>{((result.bids.price + result.asks.price) / 2).toFixed(8)}</span></div>

                    <Accordion value= {result.bids.amount.toFixed(8)+" @ "+ result.bids.price.toFixed(8)} title="Продажа" id="accordion-1">
                        {(amount > result.bids.amount) ? <p className="warning">Обратите внимание, вы сможете продать меньше монет, чем хотите</p> : null}
                        {unpack(result.bids, pair, "bids", result.bids.amount, result.bids.price)}
                    </Accordion>
                    <Accordion value={result.asks.amount.toFixed(8)+" @ "+ result.asks.price.toFixed(8)} title="Покупка" id="accordion-1">
                        {(amount > result.asks.amount) ? <p className="warning">Обратите внимание, вы сможете купить меньше монет, чем хотите</p> : null}
                        {unpack(result.asks, pair, "asks", result.asks.amount, result.asks.price)}
                    </Accordion>
                </div>): null}
            </div>
        </div>
    );
}


export default App;

