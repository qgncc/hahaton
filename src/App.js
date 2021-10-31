import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { UilExchange } from '@iconscout/react-unicons'
import Accordion from './Accordion'
import {UilArrowRight} from "@iconscout/react-unicons";

import {getPrices, updateExchange} from "./utils/api";

import './App.css';

function Input ({setAmount, ...props}) {
    return (
        <input style={{textAlign:'right'}} className="input t-input" type="numeric" onChange={
            (event) => (setAmount(parseInt(event.target.value)))
        }
        />
    )
}
function Currency({pair, values, label, selected, setPair, index, ...props}) {
    return(
        <select id="currency" className="select t-select" onChange={(event)=>setPair(pair.map(
            (e,i) => (i === index? event.target.value: e)
            )
        )}>
            {
                values.map(
                    e => <option selected={selected === e.value} value={e.name}>{e.name}</option>
                )

            }


        </select>
    );
}








function App() {

    const [pair, setPair] = useState(["ZRX","USDT"]);
    const [amount, setAmount] = useState(0);
    const [progress, setProgress] = useState(0);

    const values = [
        {name: "ZRX"},
        {name: "BAT"},
        {name: "1INCH"},
        {name: "DYDX"},
        {name: "SUSHI"},
        {name: "USDT"},

    ];



    return (
        <div className="wrapper t-wrapper">
            <div className="card t-card">
                <h1 className="title t-title">Neptune Foundation</h1>
                <div className="form">
                    <Input setAmount = {setAmount}/>
                    <Currency pair={pair} setPair={setPair} values={values} label="$" selected={"BTC"} index={0}/>
                    <span className="text">/</span>
                    <Currency pair={pair} setPair={setPair} values={values} label="$" selected={"USDT"} index={1}/>
                    <button className="submit t-submit" type="submit" value="Calc" onClick={async () =>{
                        let a = (await updateExchange(pair, 0)).next;
                        let elem = document.getElementById("progress");

                        while(a !== null){
                            a = updateExchange(pair, a.index);
                            let newWidth = elem.style.width + 100;
                            elem.style.width = newWidth;

                        }
                        await getPrices(pair, amount)

                    } }><UilArrowRight/></button>
                </div>

                <div className="progressBar">
                    <div id="progress" className="progress"></div>
                </div>

                <div className="result-wrapper" style ={{display: 'none'}} >
                    <Accordion value= "123123" title="Рыночная цена" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>
                    <Accordion value= "sd;aifjas" title="Продажа" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>
                    <Accordion value="sdaf" title="Покупка" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>
                </div>
            </div>
        </div>
    );
}


export default App;

