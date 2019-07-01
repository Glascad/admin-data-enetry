import React from "react";
import "./NavigationButtons.scss";

export default function NavigationButtons({

}) {
    return (
        <>
            <button className="NavigationButton left">
                <div>
                    <div className="navigation-arrow" id="left-arrow-top" />
                    <div className="navigation-arrow" id="left-arrow-bottom" />
                </div>
            </button>
            <button className="NavigationButton right">
                <div>
                    <div className="navigation-arrow" id="right-arrow-top" />
                    <div className="navigation-arrow" id="right-arrow-bottom" />
                </div>
            </button>
        </>
    )
}