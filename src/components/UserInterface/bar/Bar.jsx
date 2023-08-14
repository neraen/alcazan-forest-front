import React from 'react'

const Bar = (props) => {

    const getWithValueBar = () => {
        if(props.value < 0) return 0
        return props.value / props.max * 100 + '%';
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