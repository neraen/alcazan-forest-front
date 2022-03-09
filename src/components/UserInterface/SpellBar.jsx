import React, {useEffect, useState} from 'react'
import Spell from "../spells/Spell";
import Bar from "./Bar";
import UsersApi from "../../services/UsersApi";

const SpellBar = (props) => {

    const [experienceData, setExperienceData] = useState();
    const [spells, setSpells] = useState();

    useEffect(() => {
        getExpJoueur()
        getPlayerSpells()
    }, [])

    const getExpJoueur = async () => {
       const experienceJoueur = await UsersApi.getExpJoueur();
       setExperienceData(experienceJoueur);
    }

    const getPlayerSpells = async () => {
        const spells = await UsersApi.getPlayerSpells();
        setSpells(spells);
    }


    return <>
        <div className="spell-bar offset-2 mt-2 d-flex flex-column justify-content-center align-items-center px-4">
            <div className="exp-bar-container mb-3">
                <div className="exp-icon-container">
                    <img className="exp-icon" src="/img/gui/Xp.png" />
                </div>
                {(experienceData) &&
                <Bar value={experienceData.experienceActuelle} max={experienceData.experienceMax} maxWidth={1000} classN="expBar"/> ||
                <Bar value={0} max={99999} maxWidth={1000} classN="expBar"/>
                }
            </div>
            <div className="spells row align-items-center">
                <div className="col-6 d-flex">
                    {spells && spells.map(spell => (
                        <Spell key={spell.name} spell={spell} />
                    ))}
                    {spells && [...Array(12 - spells.length)].map((x, i) =>
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