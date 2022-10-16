import React, {useEffect, useState} from 'react'
import UsersApi from "../../services/UsersApi";


const ProfilSpells = (props) => {

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        fetchAllPlayerSpell()
    })

    const fetchAllPlayerSpell = async() =>{
        const spellsFromApi = UsersApi.getPlayerSpells()
        setSpells(spellsFromApi);
    }

    return <>
      <h1>Profils spells</h1>
    </>
}

export default ProfilSpells