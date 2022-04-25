import React, {useEffect, useState} from 'react'
import InventaireApi from "../../services/InventaireApi";


const Equipements = (props) => {

    const [equipementEquipe, setEquipementEquipe] = useState([])
    const [caracteristiquesBonus, setCaracteristiquesBonus] = useState({
        armure: 0,
        force: 0,
        dexterite: 0,
        constitution: 0,
        intelligence: 0,
        concentration: 0,
        chance: 0,
        critique: 0
    })

    useEffect(() => {
        fetchEquipementEquipe();
    }, [])

    const fetchEquipementEquipe = async () => {
        const dataEquipementEquipe = await InventaireApi.getEquipementEquipe();
        await setEquipementEquipe(dataEquipementEquipe);

        await computeTotalEquipementCarcacs();

    }

    const  computeTotalEquipementCarcacs = async () => {

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

        await equipementEquipe.forEach((equipement) => {
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

        await setCaracteristiquesBonus(caracteristiques)
    }

    const handleTakeOffEquipement = async (idEquipement) => {
        await InventaireApi.unwearEquipement(idEquipement);
        fetchEquipementEquipe();
    }

    const handleEquipEquipement = async (idEquipement) => {
        await InventaireApi.wearEquipement(idEquipement);
        fetchEquipementEquipe();
    }

    return <>
        <div className="inventaire-layout">
            <div className="inventaire-left-part">
                <h4 className="inventaire-subtitle">Items</h4>
                <div className="inventaire-equipements">
                    <div className="inventaire-items">
                        { props.equipements && props.equipements.map((equipement) =>
                            <div onDoubleClick={() => {handleEquipEquipement(equipement.idEquipement); props.shouldRefreshInventory()}}  className="inventaire-item" key={equipement.idEquipement}>
                                <img className="inventaire-item-img" src={'../img/equipement/'+equipement.position+'/'+equipement.imageEquipement}/>
                                <div className="inventaire-item-quantity">{equipement.quantity}</div>
                                <div className={"inventaire-item-hover " + equipement.rarityName}>
                                    <div className="inventaire-item-hover-header">
                                        {equipement.nomEquipement}
                                    </div>
                                    <div className="inventaire-item-hover-body">
                                        <div className="inventaire-item-title">- Caractéritiques -</div>
                                        {equipement.caracteristiques.map((caracteristique) =>
                                            <div key={'caracteristique'+caracteristique.id}>
                                                {caracteristique.nom[0].toUpperCase()+caracteristique.nom.slice(1)} : + {caracteristique.valeur}
                                            </div>
                                        )}
                                        <hr />
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">Description : </div>
                                            <div className="inventaire-item-element-italic"> {equipement.descriptionEquipement} </div>
                                        </div>
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">valeur : {equipement.prixReventeEquipement} Pièces d'or </div>

                                        </div>
                                    </div>
                                    <div className="inventaire-item-hover-footer">
                                        Niveau requis : {equipement.levelMinEquipement}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="inventaire-right-part">
                <h4 className="inventaire-subtitle">Equipé</h4>
                <div className="equipement position-relative">

                    {/*<img className="mt-3 ml-3" src="../img/sprites/enemies/actor1_5.png"/>*/}
                    {equipementEquipe && equipementEquipe.map((equipement) =>
                        <div onDoubleClick={() => {handleTakeOffEquipement(equipement.idEquipement); props.shouldRefreshInventory()}} className={"item-case "+equipement.position}><img className="icone-equipement" src={"../img/equipement/"+equipement.position+"/"+equipement.imageEquipement} alt=""/>
                            <div className={"inventaire-item-hover " + equipement.rarityName}>
                                <div className="inventaire-item-hover-header">
                                    {equipement.nomEquipement}
                                </div>
                                <div className="inventaire-item-hover-body">
                                    <div className="inventaire-item-title">- Caractéritiques -</div>
                                    {equipement.caracteristiques.map((caracteristique) =>
                                        <div key={'caracteristique'+caracteristique.id}>
                                            {caracteristique.nom[0].toUpperCase()+caracteristique.nom.slice(1)} : + {caracteristique.valeur}
                                        </div>
                                    )}
                                    <hr />
                                    <div className="inventaire-item-element">
                                        <div className="inventaire-item-element-strong">Description : </div>
                                        <div className="inventaire-item-element-italic"> {equipement.descriptionEquipement} </div>
                                    </div>
                                    <div className="inventaire-item-element">
                                        <div className="inventaire-item-element-strong">valeur : {equipement.prixReventeEquipement} <img src="../img/gui/MainWindowCharacter/icons/Money03.png" /> </div>

                                    </div>
                                </div>
                                <div className="inventaire-item-hover-footer">
                                    Niveau requis : {equipement.levelMinEquipement}
                                </div>
                            </div>
                        </div>
                    )}
                    <img className="" src="../img/gui/MainWindowCharacter/inventaire_masculin.png"/>
                </div>
                <div className="inventaire-equipement-caracteristiques">
                    <h4 className="inventaire-subtitle mt-4">Bonus</h4>
                    <div>armure : <span className="font-weight-bold"> + {caracteristiquesBonus.armure} </span></div>
                    <div>constitution : <span className="font-weight-bold"> + {caracteristiquesBonus.constitution} </span></div>
                    <div>force : <span className="font-weight-bold"> + {caracteristiquesBonus.force} </span></div>
                    <div>dexterité : <span className="font-weight-bold"> + {caracteristiquesBonus.dexterite}</span></div>
                    <div>intelligence : <span className="font-weight-bold"> + {caracteristiquesBonus.intelligence} </span></div>
                    <div>concentration :<span className="font-weight-bold"> + {caracteristiquesBonus.concentration}</span></div>
                    <div>chance : <span className="font-weight-bold"> + {caracteristiquesBonus.chance} </span></div>
                    <div>critique : <span className="font-weight-bold"> + {caracteristiquesBonus.critique} </span></div>
                </div>
            </div>
        </div>
    </>
}

export default Equipements;