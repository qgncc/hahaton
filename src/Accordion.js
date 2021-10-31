import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { UilAngleRightB } from "@iconscout/react-unicons";

function Accordion({title, id, value, children, ...props}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <React.Fragment>
            <div className="result t-result" data-accordion_id={id} onClick={() => setOpen(!isOpen)}>
                <span className="text accordion-title"><h3><UilAngleRightB className="icon"/>{title}</h3></span>
                <span className="text accordion-title"><h3>{value}</h3></span>
            </div>
            <div className="text" id={id}>
                {isOpen ? children : null}
            </div>
        </React.Fragment>
    );
}


export default Accordion;