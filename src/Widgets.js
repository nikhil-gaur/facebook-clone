import React from 'react';
import "./Widgets.css"

function Widgets() {
    return (
        <div className="widgets">
            <iframe
            
            src="https://colorhunt.co/"
            width="340px"
            height="100%"
            style={ { border: "none", overflow: "hidden "} }
            scrolling="yes"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"

            ></iframe>
        </div>
    )
}

export default Widgets;
