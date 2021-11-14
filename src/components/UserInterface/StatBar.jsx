import React from 'react'

const StatBar = ({value, max, maxWidth, classN, displayText=true}) => {

    const getWithValueBar = () => {
        return value / max * maxWidth;
    }

    return(
        <>
            <div className={classN}>
                <div className="valueBar" style={{width : getWithValueBar()}}><span className="value-bar-text">{displayText && value +" / "+ max}</span></div>
            </div>
        </>
    )

}

export default StatBar;