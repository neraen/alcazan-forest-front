import React from 'react'

const StatBar = ({value, max, maxWidth, classN, displayText=true}) => {

    const getWithValueBar = () => {
        console.log(window.innerWidth)
        return value / max * maxWidth;
    }

    return(
        <>
            <div style={{width : maxWidth}} className={classN}>
                <div className="valueBar" style={{width : getWithValueBar()}}><span className="value-bar-text">{displayText && value +" / "+ max}</span></div>
            </div>
        </>
    )

}

export default StatBar;