import React, {useEffect, useState} from 'react'
import Spell from "../spells/Spell";

const SpellBar = (props) => {

    const [spells, setSpells] = useState({})


    return <>
        <div className="spell-bar offset-2 mt-2 d-flex px-4">
            <div className="spells row align-items-center">
                <div className="col-6 d-flex">
                    {props.spells.map(spell => (
                        <Spell key={spell.name} spell={spell} />
                    ))}
                </div>
                <div className="col-5 offset-1">

                </div>

            </div>
        </div>
    </>
}
 //{spells.map(spell => (<Spell spell={spell} />))}
export default SpellBar