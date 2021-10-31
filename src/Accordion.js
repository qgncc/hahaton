import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {UilAngleRightB} from "@iconscout/react-unicons";

function Accordion(props) {
    const [isOpen, setOpen] = useState(true);

    return(
    <React.Fragment>
        <div className="result t-result accordion-title" data-accordion_id = {props.id} onClick={()=>{
                if(isOpen)
                    setOpen(false);
                else
                    setOpen(true)
            }
        }>
            <span className="text"><h4><UilAngleRightB className = "icon"/>{props.title}</h4></span>
            <span className="text"><h5>{props.value}</h5></span>

        </div>
        <div id = {props.id}  >
            {isOpen ? props.children : null}
        </div>
    </React.Fragment>
    );
}


export default Accordion;