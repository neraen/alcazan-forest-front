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

    useEffect(() => {
        fetchCaracteristiques(props.user.id)
    }, []);

    const fetchCaracteristiques =  async id => {
        const caracs = await UsersApi.getCaracteristiques(id)
        let caracsToSet = caracteristiques
        caracs.map((value) => {
            caracsToSet = {...caracsToSet, [value.caracteristique.nom] : value.points}
        })
        setCaracteristiques(caracsToSet);
    }

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCaracteristiques({...caracteristiques, [name]: value})
    }

    function attaque(principale, secondaire, level){
        let somme = 0;
        let max = 0;
        let min = 10000;
        for(let x = 0; x < 1000; x++){
            let attaque = Math.floor(50 + (level * 1.5 + 20 * Math.random()) + (Math.random() * (principale + level - secondaire - level) + secondaire) * 1.6)
            max = max < attaque ? attaque : max;
            min = min < attaque ? min : attaque;
            somme = somme + attaque;
        }
        console.log("max : " + max);
        console.log("min : " + min);
        console.log("moyenne : " + somme / 1000);
    }

    const handleClick = (name, value) => {
        setCaracteristiques({...caracteristiques, [name] :  value})
    }

    const handleSubmit = () => {
        UsersApi.updateCaracteristiques(caracteristiques);
    }


    return <>
        <div className="profil profil-main">
            <div className="informations">
                <h2>Informations</h2>
                <span>Classe : Archer</span>
                <span>Niveau : 12</span>
                <span>guilde : aucune</span>
                <span>Alignement : aucun</span>
                <span>karma : malandrin</span>

                <h2 className="mt-5">Equipement</h2>

                <span>constitution : <span className="font-weight-bold"> + 18 </span></span>
                <span>force : <span className="font-weight-bold"> + 74 </span></span>
                <span>dexterité : <span className="font-weight-bold"> +118 </span></span>
                <span>intelligence : <span className="font-weight-bold"> + 2 </span></span>
                <span>concentration :<span className="font-weight-bold"> + 1 </span></span>
                <span>chance : <span className="font-weight-bold"> + 12 </span></span>
             </div>
             <div className="equipement">
                 <h2 className="text-center">Equipement</h2>
                 {/*<img className="mt-3 ml-3" src="../img/sprites/enemies/actor1_5.png"/>*/}
                 {/*<div className="item-case archer bottes"></div>*/}
                 {/*<div className="item-case archer bras"></div>*/}
                 {/*<div className="item-case archer arme"></div>*/}
                 {/*<div className="item-case archer tete"></div>*/}
                 {/*<div className="item-case archer corps"></div>*/}
                 <img src="../img/gui/MainWindowCharacter/BodyRectangles.png"/>
             </div>
            <div className="caracteristiques">
                <h2>Caracteristique (5)</h2>
                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('constitution', caracteristiques.constitution + 1)} ><i>+</i></button>
                        <Field className="" disabled="disabled" name="constitution" label="Constitution" placeholder="" onChange={handleChange} value={caracteristiques.constitution} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('constitution', caracteristiques.constitution - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('force', caracteristiques.force + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="force" label="Force" placeholder="" onChange={handleChange} value={caracteristiques.force} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('force', caracteristiques.force - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('dexterite', caracteristiques.dexterite + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="dexterite" label="Dextérité" placeholder="" onChange={handleChange} value={caracteristiques.dexterite} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('dexterite', caracteristiques.dexterite - 1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('intelligence', caracteristiques.intelligence + 1)}><i>+</i></button>
                         <Field disabled="disabled" name="intelligence" label="Intelligence" placeholder="" onChange={handleChange} value={caracteristiques.intelligence} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('intelligence', caracteristiques.intelligence -1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('concentration', caracteristiques.concentration + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="concentration" label="Concentration" placeholder="" onChange={handleChange} value={caracteristiques.concentration} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('concentration', caracteristiques.concentration-1)}><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" onClick={() => handleClick('chance', caracteristiques.chance + 1)}><i>+</i></button>
                        <Field disabled="disabled" name="chance" label="Chance" placeholder="" onChange={handleChange} value={caracteristiques.chance} />
                    <button className="btn-caracteristique-reverse" onClick={() => handleClick('chance', caracteristiques.chance-1)}><i>-</i></button>
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