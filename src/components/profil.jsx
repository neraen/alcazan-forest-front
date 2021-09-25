import React, {useState, useEffect} from 'react'
import Field from "./forms/Field";
import UsersApi from "../services/UsersApi";

const Profil = (props) => {

    //const id = this.userInfo()

    const [caracteristiques, setCaracteristiques] = useState({
        constitution: 0,
        force: 0,
        dexterite: 0,
        intelligence: 0,
        concentration: 0,
        chance: 0
    })

    let id = 1


    useEffect(() => {
        fetchCaracteristiques(props.user.id)
    }, [id]);

    const fetchCaracteristiques = (id) => {
        UsersApi.getCaracteristiques(id).then(caracteristiques => {
           caracteristiques.map((value) => {
               console.log(value)
               setCaracteristiques({...caracteristiques, [value.caracteristique.nom] : value.points})
           })
        })
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


    return <>
        <div className="profil">
            <div className="informations">
                <h2>Informations</h2>
                <span>Classe : Archer</span>
                <span>Niveau : 12</span>
                <span>guilde : aucune</span>
                <span>Alignement : aucun</span>
                <span>karma : malandrin</span>
             </div>
            <div className="caracteristiques">
                <h2>Caracteristique</h2>
                <div className="champ-caracteristique">
                    <button className="btn-caracteristique" ><i>+</i></button>
                        <Field className="" disabled="disabled" name="constitution" label="Constitution" placeholder="" onChange={handleChange} value={caracteristiques.constitution} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique"><i>+</i></button>
                        <Field disabled="disabled" name="force" label="Force" placeholder="" onChange={handleChange} value={caracteristiques.force} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique"><i>+</i></button>
                        <Field disabled="disabled" name="dexterite" label="Dextérité" placeholder="" onChange={handleChange} value={caracteristiques.dexterite} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique"><i>+</i></button>
                         <Field disabled="disabled" name="intelligence" label="Intelligence" placeholder="" onChange={handleChange} value={caracteristiques.intelligence} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique"><i>+</i></button>
                        <Field disabled="disabled" name="concentration" label="Concentration" placeholder="" onChange={handleChange} value={caracteristiques.concentration} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>

                <div className="champ-caracteristique">
                    <button className="btn-caracteristique"><i>+</i></button>
                        <Field disabled="disabled" name="chance" label="Chance" placeholder="" onChange={handleChange} value={caracteristiques.chance} />
                    <button className="btn-caracteristique-reverse"><i>-</i></button>
                </div>
            </div>
        </div>
        <div className="statistiques">

        </div>
    </>
}

export default Profil