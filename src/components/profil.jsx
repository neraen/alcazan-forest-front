import React, {useState, useEffect} from 'react'
import Field from "./forms/Field";
import UsersApi from "../services/UsersApi";

const Profil = (props) => {

    const [caracteristiques, setCaracteristiques] = useState({
        constitution: 0,
        force: 0,
        dexterite: 0,
        intelligence: 0,
        concentration: 0,
        chance: 0
    })

    const [maxCaracsAllowed, setMaxCaracsAllowed] = useState(0);

    useEffect(() => {
        fetchCaracteristiques(props.user.id)
    }, []);

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

    const handleSubmit = () => {
        if(maxCaracsAllowed - getActualCaracacteristiques() >= 0){
            UsersApi.updateCaracteristiques(caracteristiques);
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

                <span>constitution : <span className="font-weight-bold"> + 18 </span></span>
                <span>force : <span className="font-weight-bold"> + 74 </span></span>
                <span>dexterité : <span className="font-weight-bold"> +118 </span></span>
                <span>intelligence : <span className="font-weight-bold"> + 2 </span></span>
                <span>concentration :<span className="font-weight-bold"> + 1 </span></span>
                <span>chance : <span className="font-weight-bold"> + 12 </span></span>
             </div>
             <div className="equipement position-relative">
                 <h2 className="text-center ">Equipement</h2>
                 {/*<img className="mt-3 ml-3" src="../img/sprites/enemies/actor1_5.png"/>*/}

                 <div className="item-case tete"><img className="icone-equipement" src="../img/equipement/tete/chapeau25.png" alt=""/></div>
                 <div className="item-case cou"><img className="icone-equipement" src="../img/equipement/cou/collier01_a.png" alt=""/></div>
                 <div className="item-case corps"><img className="icone-equipement" src="../img/equipement/corps/haut12.png" alt=""/></div>
                 <div className="item-case bras-gauche"><img className="icone-equipement" src="../img/equipement/bras-droit/arc9.png" alt=""/></div>
                 <div className="item-case bras-droit"><img className="icone-equipement" src="../img/equipement/bras-gauche/anneau12.png" alt=""/></div>
                 <div className="item-case jambes"><img className="icone-equipement" src="../img/equipement/jambes/bas38.png" alt=""/></div>
                 <div className="item-case bottes"><img className="icone-equipement" src="../img/equipement/pieds/chaussons_volcano_scintillant.png" alt=""/></div>
                 <img className="" src="../img/gui/MainWindowCharacter/inventaire_masculin.png"/>
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
        {/*<div className="profil mt-5">*/}
        {/*    <div className="statistiques">*/}
        {/*        <h2>Statistiques générale</h2>*/}
        {/*        <span> Expérience totale : 3 080 690</span>*/}
        {/*        <span> Nombre monstre tués : 5650</span>*/}
        {/*        <span> Richesse max : 1 691 254</span>*/}
        {/*        <span> Morts : 74</span>*/}
        {/*        <span> Argent volé : 11 256</span>*/}
        {/*    </div>*/}

        {/*    <div className="statistiques">*/}
        {/*        <h2>Joueur contre joueur</h2>*/}
        {/*        <span> Expérience totale : 3 080 690</span>*/}
        {/*        <span> Nombre monstre tués : 5650</span>*/}
        {/*        <span> Richesse max : 1 691 254</span>*/}
        {/*        <span> Morts : 74</span>*/}
        {/*        <span> Argent volé : 11 256</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </>
}

export default Profil