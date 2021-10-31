import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { UilAngleRightB } from "@iconscout/react-unicons";

function Accordion({title, id, value, children, ...props}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <React.Fragment>
            <div className="result t-result" data-accordion_id={id} onClick={() => setOpen(!isOpen)}>
                <span className="text"><h4><UilAngleRightB className="icon"/>{title}</h4></span>
                <span className="text"><h5>{value}</h5></span>
            </div>
            <div id={id}>
                {isOpen ? children : null}
            </div>
        </React.Fragment>
    );
}


export default Accordion;