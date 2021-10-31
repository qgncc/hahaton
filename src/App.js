import React from 'react';
import ReactDOM from 'react-dom';
import { UilExchange } from '@iconscout/react-unicons'
import Accordion from './Accordion';
import { UilArrowRight } from '@iconscout/react-unicons'
import { UilAngleRightB } from '@iconscout/react-unicons'

import './App.css';






function Input () {
    return (
        <input style = {{textAlign:'right'}} className="input t-input" type="numeric" />
    )
}
function Currency({values,label, selected, ...props}) {
    return(
            <select id = "currency" className= "select t-select ">

                    {
                        values.map(e =>
                            {
                                return(
                                    <option selected={selected === e.value} value={e.value}>{e.name}</option>

                                );
                            }
                        )

                    }
            </select>
    );
}

function App() {
    const values = [
        {name:"BTC", value:10},
        {name:"ETH", value:20},
        {name:"ETC", value:30},
        {name:"LTS", value:40},
        {name:"USD", value:50},

    ];



  return (

        <div className="wrapper t-wrapper">
            <div className="card t-card">
                <h1 className="title t-title">Neptune foundation</h1>
                <div className="form">
                    <Input />
                        <Currency values = {values} label = "$" selected = {10}/>
                        <span className="text">/</span>
                        <Currency values = {values} label = "$" selected = {50}/>
                    <button className= "submit t-submit" type="submit" value = "Calc"><UilArrowRight/></button>
                </div>
                <div className="result-wrapper" >
                    <Accordion value = "2137124" title="Рыночная цена" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>
                    <Accordion value = "2137124" title="Продажа" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>
                    <Accordion value = "2137124" title="Покупка" id="accordion-1">loredasihjsghfghuajfodahgjhajdhf</Accordion>

                </div>
            </div>
        </div>

  );
}


export default App;

