import React, {useState, useEffect} from 'react'
import Field from "../../forms/field/Field";
import UsersApi from "../../../services/UsersApi";
import InventaireApi from "../../../services/InventaireApi";
import carateristiqueService from "../../../services/carateristiqueService";

const Profil = (props) => {

    const [caracteristiques, setCaracteristiques] = useState({
        constitution: 0,
        force: 0,
        dexterite: 0,
        intelligence: 0,
        concentration: 0,
        chance: 0
    });

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

    const [equipementEquipe, setEquipementEquipe] = useState([])

    const [maxCaracsAllowed, setMaxCaracsAllowed] = useState(0);

    useEffect(() => {
        fetchCaracteristiques(props.user.id)
        fetchEquipementEquipe();
    }, []);

    const fetchEquipementEquipe = async () => {
        const dataEquipementEquipe = await InventaireApi.getEquipementEquipe();
        const caracteristiquesBonus  = await carateristiqueService.computeEquipementCaracs(dataEquipementEquipe);
        setEquipementEquipe(dataEquipementEquipe);
        setCaracteristiquesBonus(caracteristiquesBonus);
    }

    const fetchCaracteristiques =  async id => {
        const caracsInfo = await UsersApi.getCaracteristiques(id)
        const caracs = caracsInfo.caracteristiques
        let caracsToSet = caracteristiques
        caracs.map((value) => {
            caracsToSet = {...caracsToSet, [value.nom] : value.points}
        })
        setCaracteristiques(caracsToSet);
        setMaxCaracsAllowed(caracsInfo.maxCaracsAllowed);
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCaracteristiques({...caracteristiques, [name]: value})
    }



    const handleClick = (name, value) => {
        setCaracteristiques({...caracteristiques, [name] :  value})
    }

    const handleSubmit = async () => {
        if(maxCaracsAllowed - getActualCaracacteristiques() >= 0){
            const message = await UsersApi.updateCaracteristiques(caracteristiques);
            console.log(message)
            //toast(message);
        }
    }

    const getActualCaracacteristiques = () => {
        return Object.values(caracteristiques).reduce((prevCarac, nextCarac)  => prevCarac + nextCarac);
    }


    return <>
        <div className="profil profil-main">
            <div className="informations">
                <h2>Informations</h2>
                <span>Classe : Archer</span>
                <span>Niveau : 12</span>
                <span>guilde : aucune</span>
                <span>Alignement : aucun</span>

                <h2 className="mt-5">Equipement</h2>

                <span>constitution : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}> {caracteristiques.constitution } </span> + <span style={{color: "yellowgreen"}}>{caracteristiquesBonus.constitution}</span> &nbsp;
                        ({caracteristiques.constitution  + caracteristiquesBonus.constitution})
                    </span>
                </span>
                <span>force : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}>  {caracteristiques.force } </span> + <span style={{color: "yellowgreen"}}> {caracteristiquesBonus.force}</span> &nbsp;
                        ({caracteristiques.force  + caracteristiquesBonus.force})
                    </span>
                </span>
                <span>dexterité : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}> {caracteristiques.dexterite } </span> + <span style={{color: "yellowgreen"}}> {caracteristiquesBonus.dexterite}</span> &nbsp;
                        ({caracteristiques.dexterite  + caracteristiquesBonus.dexterite})
                    </span>
                </span>
                <span>intelligence : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}> {caracteristiques.intelligence } </span> + <span style={{color: "yellowgreen"}}>{caracteristiquesBonus.intelligence}</span> &nbsp;
                         ({caracteristiques.intelligence  + caracteristiquesBonus.intelligence})
                    </span>
                </span>
                <span>concentration : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}> {caracteristiques.concentration } </span> + <span style={{color: "yellowgreen"}}>{caracteristiquesBonus.concentration}</span> &nbsp;
                         ({caracteristiques.concentration  + caracteristiquesBonus.concentration})
                    </span>
                </span>
                <span>chance : &nbsp;
                    <span className="font-weight-bold">
                        <span style={{color: "red"}}> {caracteristiques.chance } </span> + <span style={{color: "yellowgreen"}}>{caracteristiquesBonus.chance}</span> &nbsp;
                         ({caracteristiques.chance  + caracteristiquesBonus.chance})
                    </span>
                </span>
             </div>

             <div className="equipement position-relative">
                 <h2 className="text-center ">Equipement</h2>
                 {equipementEquipe && equipementEquipe.map((equipement) =>
                     <div className={"item-case "+equipement.position}><img className="icone-equipement" src={"../img/equipement/"+equipement.position+"/"+equipement.imageEquipement} alt=""/>
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
                                     <div className="inventaire-item-element-strong">valeur : {equipement.prixReventeEquipement} <img src="../../../img/gui/MainWindowCharacter/Icons/Money03.png" />  </div>

                                 </div>
                             </div>
                             <div className="inventaire-item-hover-footer">
                                 Niveau requis : {equipement.levelMinEquipement}
                             </div>
                         </div>
                     </div>
                 )}
                 <img className="" src="../../../img/gui/MainWindowCharacter/inventaire_masculin.png"/>
             </div>

            <div className="caracteristiques">
                <h2>Caracteristique ({maxCaracsAllowed - getActualCaracacteristiques()})</h2>
                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('constitution', caracteristiques.constitution + 1)} ><i>+</i></button>
                        <Field className="" disabled="disabled" name="constitution" label="Constitution" placeholder="" onChange={handleChange} value={caracteristiques.constitution} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.constitution <= 0} onClick={() => handleClick('constitution', caracteristiques.constitution - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('force', caracteristiques.force + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="force" label="Force" placeholder="" onChange={handleChange} value={caracteristiques.force} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.force <= 0} onClick={() => handleClick('force', caracteristiques.force - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('dexterite', caracteristiques.dexterite + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="dexterite" label="Dextérité" placeholder="" onChange={handleChange} value={caracteristiques.dexterite} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.dexterite <= 0} onClick={() => handleClick('dexterite', caracteristiques.dexterite - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('intelligence', caracteristiques.intelligence + 1)}><i>+</i></button>
                         <Field disabled="disabled" name="intelligence" label="Intelligence" placeholder="" onChange={handleChange} value={caracteristiques.intelligence} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.intelligence <= 0} onClick={() => handleClick('intelligence', caracteristiques.intelligence -1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('concentration', caracteristiques.concentration + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="concentration" label="Concentration" placeholder="" onChange={handleChange} value={caracteristiques.concentration} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.concentration <= 0} onClick={() => handleClick('concentration', caracteristiques.concentration-1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" disabled={(maxCaracsAllowed - getActualCaracacteristiques()) <= 0} onClick={() => handleClick('chance', caracteristiques.chance + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="chance" label="Chance" placeholder="" onChange={handleChange} value={caracteristiques.chance} />
                    <button className="btn-caracteristique-reverse" disabled={caracteristiques.chance <= 0} onClick={() => handleClick('chance', caracteristiques.chance-1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-valider-caracs" onClick={handleSubmit}> Valider </button>
                </div>
            </div>
        </div>
        <div className="profil mt-5">
            <div className="statistiques">
                <h2>Statistiques générale</h2>
                <span> Expérience totale : 3 080 690</span>
                <span> Nombre monstre tués : 5650</span>
                <span> Richesse max : 1 691 254</span>
                <span> Morts : 74</span>
                <span> Argent volé : 11 256</span>
            </div>

            <div className="statistiques">
                <h2>Joueur contre joueur</h2>
                <span> Expérience totale : 3 080 690</span>
                <span> Nombre monstre tués : 5650</span>
                <span> Richesse max : 1 691 254</span>
                <span> Morts : 74</span>
                <span> Argent volé : 11 256</span>
            </div>
        </div>
    </>
}

export default Profil