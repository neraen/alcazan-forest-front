import React, {useEffect, useState} from 'react'
import Spell from "../../spells/spell/Spell";
import Bar from "../bar/Bar";
import UsersApi from "../../../services/UsersApi";
import Consommable from "../../consommable/Consommable";
import Buff from "../../spells/buff/Buff";

const SpellBar = (props) => {

    const [experienceData, setExperienceData] = useState({experienceActuelle : 0, experienceMax: 0});
    const [spells, setSpells] = useState();
    const [consommables, setConsommables] = useState();

    useEffect(() => {
        if(experienceData.experienceMax === 0){
            getExpJoueur()
        }

        getPlayerSpells()
    }, [])

    const getExpJoueur = async () => {
       const experienceJoueur = await UsersApi.getExpJoueur();
       setExperienceData(experienceJoueur);
    }

    const getPlayerSpells = async () => {
        const spells = await UsersApi.getPlayerSpells();
        const consommables = await UsersApi.getPlayerConsommables();
        setSpells(spells);
        setConsommables(consommables);

        props.setSpellsLoaded(true);
    }


    return <>
        <div className="spell-bar mt-2 d-flex flex-column justify-content-center align-items-center px-4">
            <div className="exp-bar-container mb-3">
                <div className="exp-icon-container">
                    <img className="exp-icon" src="/img/gui/Xp.png" />
                </div>
                {(experienceData) &&
                <Bar value={props.newExperience !== 0  ? props.newExperience : experienceData.experienceActuelle} max={experienceData.experienceMax} maxWidth={1000} classN="expBar"/> ||
                <Bar value={0} max={99999} maxWidth={1000} classN="expBar"/>
                }
            </div>

            <div className="spells align-items-center">
                <div className="d-flex">
                    {spells && spells.map(spell => (
                        <Spell key={spell.id} spell={spell} />
                    ))}
                    {spells && [...Array(8 - spells.length)].map((x, i) =>
                        <div  className="spell" key={i}>

                        </div>
                    )}

                    <div className="spell-bar-separator">

                    </div>

                    {consommables && consommables.map(consommable => (
                        <Consommable key={consommable.id} consommable={consommable} />
                    ))}
                    {consommables && [...Array(2 - consommables.length)].map((x, i) =>
                        <div  className="spell" key={i}>

                        </div>
                    )}

                    <div className="spell-bar-separator">

                    </div>

                    <Buff />
                </div>


            </div>
        </div>
    </>
}
 //{spells.map(spell => (<Spell spell={spell} />))}
export default SpellBar