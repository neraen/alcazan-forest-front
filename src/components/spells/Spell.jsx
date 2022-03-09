import React, {useEffect, useState} from 'react'
import UsersApi from "../../services/UsersApi";
import {publish} from "../../pages/MapPage";

const Spell = (props) => {

    const [passedTime, setPassedTime] = useState(100);
    const [time, setTime] = useState(0);


    useEffect(() => {
        if(passedTime >= 100){
            document.querySelector(".spell-filter-" + props.spell.id).style.background = 'none';
        }else{
            document.querySelector(".spell-filter-" + props.spell.id).style.background = 'conic-gradient(rgba(0, 0, 0, 0.6) '+ passedTime +'% ,rgba(0, 0, 0, 0.1)  '+ passedTime +'%)';
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
        activateSkill();
        const target = JSON.parse(window.localStorage.getItem('target'));
        console.log(props.spell.id);
        const attackStats = await UsersApi.applyAttaqueToPlayer(target, props.spell.id)
        console.log(attackStats)
        publish({id: target.id, type: target.type, experience: attackStats.experience, damage: attackStats.damage})

    }

    const attaqueDamage = (principale, secondaire, level) => {
        return Math.floor(50 + (level * 1.5 + 20 * Math.random()) + (Math.random() * (principale + level - secondaire - level) + secondaire) * 1.6)
    }

    return <>
        <div className="spell-container"  onClick={handleAttack}>
            <div className={"spell-filter spell-filter-" + props.spell.id}>{time > 0 && (time/1000).toLocaleString('fr-FR', {maximumFractionDigits: 1})}</div>
            <div title={props.spell.name} className="spell">
                <img src={"../../../img/gui/spells/spell-icon/2/" + props.spell.icone} className="img-spell"/>
            </div>
        </div>
    </>
}

export default Spell