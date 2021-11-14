import React, {useEffect, useState} from 'react'
import Spell from "../spells/Spell";
import Bar from "./Bar";

const SpellBar = (props) => {

    const [spells, setSpells] = useState({})


    return <>
        <div className="spell-bar offset-2 mt-2 d-flex flex-column justify-content-center align-items-center px-4">
            <div className="exp-bar-container mb-3">
                <div className="exp-icon-container">
                    <img className="exp-icon" src="/img/gui/Xp.png" />
                </div>
                <Bar value={8742} max={10000} maxWidth={1000} classN="expBar"/>
            </div>
            <div className="spells row align-items-center">
                <div className="col-6 d-flex">
                    {props.spells.map(spell => (
                        <Spell key={spell.name} spell={spell} />
                    ))}
                    {[...Array(12 - props.spells.length)].map((x, i) =>
                        <div  className="spell" key={i}>

                        </div>
                    )}
                </div>
                <div className="col-5 offset-1">

                </div>

            </div>
        </div>
    </>
}
 //{spells.map(spell => (<Spell spell={spell} />))}
export default SpellBar