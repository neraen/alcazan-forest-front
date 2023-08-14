import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {fetchTargetInfo, updateJoueurState, removePlayerTarget} from "../../store/actions";
import UserActionApi from "../../services/UserActionApi";

const Consommable = (props) => {

    const [passedTime, setPassedTime] = useState(100);
    const [time, setTime] = useState(0);
    const [disable, setDisable] = useState(false);


    useEffect(() => {
        if(passedTime >= 100){
            if(!disable){
                document.querySelector(".consommable-filter-" + props.consommable.id).style.background = 'none';
            }else{
                document.querySelector(".consommable-filter-" + props.consommable.id).style.background = 'rgba(255,0,0,0.35)';
            }
        }else{
            document.querySelector(".consommable-filter-" + props.consommable.id).style.background = 'conic-gradient(rgba(0, 0, 0, 0.6) '+ passedTime +'% ,rgba(0, 0, 0, 0.1)  '+ passedTime +'%)';
        }
    })

    const SECOND_IN_MS = 1000;
    const UPDATE_INTERVAL = SECOND_IN_MS / 60;


    const activateSkill = () => {

        setPassedTime(100);
        let time = props.consommable.cooldown * 1000  - UPDATE_INTERVAL;
        setTime(time);

        // Update remaining cooldown
        const intervalID = setInterval(() => {
            // Pass remaining time in percentage to CSS
            setPassedTime(time / props.consommable.cooldown / 1000 * 100);


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

    const handleUseConsommable= async event => {
        if(passedTime >= 100){
            setDisable(false)
            activateSkill();
            await takeConsommable();
        }
    }

    const takeConsommable = async () => {
        const statsAfterUseConsommable = await UserActionApi.takeConsommable(props.consommable.id);
        props.updateJoueurState({
            lifeJoueur: statsAfterUseConsommable.life,
            manaJoueur: statsAfterUseConsommable.mana,
        })

        if(statsAfterUseConsommable.message !== ""){
            //toast(statsAfterUseConsommable.message);
        }
    }

    return <>
        {/*{disable && <div>La cible est trop loin</div>}*/}
        <div title={props.consommable.nom} className={"spell-container"} onClick={handleUseConsommable}>
            <div className={"consommable-filter consommable-filter-" + props.consommable.id}>{time > 0 && (time/1000).toLocaleString('fr-FR', {maximumFractionDigits: 1})}</div>
            <div  className="spell">
                <img src={"../../img/consommables/" + props.consommable.icone} className="img-spell"/>
            </div>
        </div>
    </>
}

export default connect((state, ownProps) => {
    let target = state.data.target;
    let positionJoueur = state.data.positionJoueur;
    return {target, positionJoueur, ownProps};
}, {fetchTargetInfo, updateJoueurState, removePlayerTarget})(Consommable);