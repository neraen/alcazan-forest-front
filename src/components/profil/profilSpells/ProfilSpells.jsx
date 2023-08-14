import React, {useEffect, useState} from 'react'
import UsersApi from "../../../services/UsersApi";
import ProfilSpellBar from "../../UserInterface/profilSpellBar/ProfilSpellBar";


const ProfilSpells = (props) => {

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        fetchAllPlayerSpell()
    }, [])

    const fetchAllPlayerSpell = async() =>{
        const spellsFromApi = await UsersApi.getPlayerSpells()
        setSpells(spellsFromApi);
    }

    return <>
        <h1 className="profil-spells-title">Vos sortilèges</h1>
        <table className="profil-spells-container">
            <tr className="spell-detail-container">
                <th>Sortilege</th>
                <th>Description</th>
                <th>Ordre d'affichage</th>
            </tr>
            {spells && spells.map((spell, index) => (
                <tr className="spell-detail-container">

                    <td>{spell.nom}</td>
                    <td>
                        <div className="spell-description-cell">
                            <img src={"../../../img/spell/" + spell.icone} className="spell-description-img img-spell"/>
                            <div className="spell-description-text">
                                {spell.description} <br /> Cooldown : {spell.cooldown} <br /> Portée : {spell.portee}
                            </div>
                        </div>
                    </td>
                    <td><input className="spell-order-input form-control" type="number" value={index}/></td>
                </tr>
            ))}
        </table>

        {spells && <ProfilSpellBar spells={spells}/>}
    </>
}

export default ProfilSpells