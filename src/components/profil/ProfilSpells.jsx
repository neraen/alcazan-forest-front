import React, {useEffect, useState} from 'react'
import UsersApi from "../../services/UsersApi";


const ProfilSpells = (props) => {

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        fetchAllPlayerSpell()
    })

    const fetchAllPlayerSpell = async() =>{
        const spellsFromApi = await UsersApi.getPlayerSpells()
        setSpells(spellsFromApi);
    }

    return <>
      <h1>Profils spells</h1>
        <table className="profil-spells-container">
            <tr className="spell-detail-container">
                <th>Sortilege</th>
                <th>Description</th>
                <th>Ordre d'affichage</th>
            </tr>
            {spells && spells.map(spell => (
                <tr className="spell-detail-container">
                    <td>{spell.name}</td>
                    <td>{spell.description} /// {spell.cooldown} /// {spell.portee}</td>
                    <td>1</td>
                </tr>
            ))}
        </table>
    </>
}

export default ProfilSpells