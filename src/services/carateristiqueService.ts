const computeEquipementCaracs = (equipements) => {
    const caracteristiques = {
        armure: 0,
        force: 0,
        dexterite: 0,
        constitution: 0,
        intelligence: 0,
        concentration: 0,
        chance: 0,
        critique: 0
    }

    equipements.forEach((equipement) => {
        equipement.caracteristiques.forEach((caracteristique => {
            switch (caracteristique.nom){
                case 'dexterite':
                    caracteristiques.dexterite = caracteristiques.dexterite + caracteristique.valeur
                    break;
                case 'force':
                    caracteristiques.force = caracteristiques.force + caracteristique.valeur
                    break;
                case 'chance':
                    caracteristiques.chance = caracteristiques.chance + caracteristique.valeur
                    break;
                case 'constitution':
                    caracteristiques.constitution = caracteristiques.constitution + caracteristique.valeur
                    break;
                case 'critique':
                    caracteristiques.critique = caracteristiques.critique + caracteristique.valeur
                    break;
                case 'armure':
                    caracteristiques.armure = caracteristiques.armure + caracteristique.valeur
                    break;
                case 'intelligence':
                    caracteristiques.intelligence = caracteristiques.intelligence + caracteristique.valeur
                    break;
                case 'concentration':
                    caracteristiques.concentration = caracteristiques.concentration + caracteristique.valeur
                    break;
            }

        }))
    })

    return caracteristiques;
}

export default {
    computeEquipementCaracs
}