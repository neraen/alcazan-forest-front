import React from 'react'

const Bar = (props) => {

    const getWithValueBar = () => {
        return props.value / props.max * props.maxWidth;
    }

    return(
        <>
            <label className="label-bar">{props.value} / {props.max}</label>
            <div className={props.classN}>
                <div className="valueBar" style={{width : getWithValueBar()}}></div>
            </div>
        </>
    )

}

export default Bar;