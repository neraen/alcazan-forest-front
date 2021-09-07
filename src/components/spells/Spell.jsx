import React, {useEffect} from 'react'

const Spell = (props) => {

    useEffect(() => {
        console.log(props)
    }, [])

    const handleAttack = () => {

    }

    return <>
        <div onClick={handleAttack} className="spell" style={{backgroundImage: "url(../../../img/icons/archer/" + props.spell.icone + ")"}}>

        </div>
    </>
}

export default Spell