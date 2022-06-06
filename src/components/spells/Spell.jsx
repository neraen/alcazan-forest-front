import React, {useEffect, useState} from 'react'
import UsersApi from "../../services/UsersApi";
import {connect} from "react-redux";
import {fetchTargetInfo, updateJoueurState, removePlayerTarget} from "../../store/actions";
import distanceCalculator from "../../services/distanceCalculator";
import {toast} from "react-toastify";

const Spell = (props) => {

    const [passedTime, setPassedTime] = useState(100);
    const [time, setTime] = useState(0);
    const [disable, setDisable] = useState(false);


    useEffect(() => {
        if(passedTime >= 100){
            if(!disable){
                document.querySelector(".spell-filter-" + props.spell.id).style.background = 'none';
            }else{
                document.querySelector(".spell-filter-" + props.spell.id).style.background = 'rgba(255,0,0,0.35)';
            }
        }else{
            document.querySelector(".spell-filter-" + props.spell.id).style.background = 'conic-gradient(rgba(0, 0, 0, 0.6) '+ passedTime +'% ,rgba(0, 0, 0, 0.1)  '+ passedTime +'%)';
        }


        if(props.target.type === "player"){
            const distance = distanceCalculator.computeDistance(props.target.abscisseTarget, props.target.ordonneeTarget, props.positionJoueur.abscisse, props.positionJoueur.ordonnee);
            if(props.spell.portee < distance){
                setDisable(true);
            }else{
                setDisable(false);
            }
        }else{
            setDisable(false)
        }
    })

    const SECOND_IN_MS = 1000;
    const UPDATE_INTERVAL = SECOND_IN_MS / 60;


    const activateSkill = () => {

        setPassedTime(100);
        let time = props.spell.cooldown * 1000  - UPDATE_INTERVAL;
        setTime(time);

        // Update remaining cooldown
        const intervalID = setInterval(() => {
            // Pass remaining time in percentage to CSS
            setPassedTime(time / props.spell.cooldown / 1000 * 100);


            // Display time left
            //target.textContent = (time / SECOND_IN_MS).toFixed(2);

            time -= UPDATE_INTERVAL;
            setTime(time);
            // Stop timer when there is no time left
            if(time < 0) {
                //target.textContent = '';
                setPassedTime(100);
                clearInterval(intervalID);
            }
        }, UPDATE_INTERVAL);
    }

    const handleAttack = async event => {
        if(props.target.type === "player"){
            const distance = distanceCalculator.computeDistance(props.target.abscisseTarget, props.target.ordonneeTarget, props.positionJoueur.abscisse, props.positionJoueur.ordonnee);
            if(props.spell.portee < distance){
                setDisable(true)
            }else{
                if(passedTime >= 100){
                    setDisable(false)
                    activateSkill();
                    await launchAttack();
                }
            }
        }else if(props.target.type === "monstre"){
            await launchAttack();
        }else{
            console.log(props.target.type)
            toast("Vous n'avez pas de cible.")
        }
    }

    const launchAttack = async () => {
        let attackStats = {};

        if(props.target.type === "player"){
            attackStats = await UsersApi.applyAttaqueToPlayer(props.target.targetId, props.spell.id)
        }else{
            attackStats = await UsersApi.applyAttaqueToMonster(props.target.targetId, props.spell.id)
        }

        await props.fetchTargetInfo(props.target.targetId, props.target.type);
        props.updateJoueurState({
            experience: attackStats.experience,
            damage: attackStats.damage,
            newExperience: attackStats.newExperience,
            lifeJoueur: attackStats.lifeJoueur,
            damageReturns: attackStats.damageReturns,
            droppedItems: (attackStats.droppedItems[0] !== undefined) ? attackStats.droppedItems[0] : "",
            level: attackStats.level,
            killMessage: attackStats.killMessage,
            needRefresh: true
        })

        /** todo verifier si target.mapId !== joueur.MapId */
        if(attackStats.killMessage){
            props.removePlayerTarget();
        }
    }

    return <>
        {/*{disable && <div>La cible est trop loin</div>}*/}
        <div title={props.spell.nom} className={"spell-container"} onClick={handleAttack}>
            <div className={"spell-filter spell-filter-" + props.spell.id}>{time > 0 && (time/1000).toLocaleString('fr-FR', {maximumFractionDigits: 1})}</div>
            <div  className="spell">
                <img src={"../../../img/spell/" + props.spell.icone} className="img-spell"/>
            </div>
        </div>
    </>
}

export default connect((state, ownProps) => {
    let target = state.data.target;
    let positionJoueur = state.data.positionJoueur;
    return {target, positionJoueur, ownProps};
}, {fetchTargetInfo, updateJoueurState, removePlayerTarget})(Spell);