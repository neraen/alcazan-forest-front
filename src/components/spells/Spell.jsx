import React, {useEffect} from 'react'
import UsersApi from "../../services/UsersApi";

const Spell = (props) => {

    let passedTime = 100;
    let style = {background: 'conic-gradient(rgba(0, 0, 0, 0.7) '+ passedTime +'% ,rgba(0, 0, 0, 0.1)  '+ passedTime +'%)'}

    useEffect(() => {
        style = {background: 'conic-gradient(rgba(0, 0, 0, 0.7) '+ passedTime +'% ,rgba(0, 0, 0, 0.1)  '+ passedTime +'%)'}
    }, [passedTime])

    const SECOND_IN_MS = 1000;
    const UPDATE_INTERVAL = SECOND_IN_MS / 60;


    const activateSkill = () => {

        passedTime = 100;
        let time = props.spell.cooldown * 1000  - UPDATE_INTERVAL;

        // Update remaining cooldown
        const intervalID = setInterval(() => {
            // Pass remaining time in percentage to CSS
            passedTime = time / props.spell.cooldown / 1000 * 100;
            console.log(style)

            // Display time left
            //target.textContent = (time / SECOND_IN_MS).toFixed(2);
            time -= UPDATE_INTERVAL;

            // Stop timer when there is no time left
            if(time < 0) {
                //target.textContent = '';
                passedTime = 100;
                clearInterval(intervalID);
            }
        }, UPDATE_INTERVAL);
    }

    const handleAttack = event => {
       // activateSkill();
        const target = JSON.parse(window.localStorage.getItem('target'));
        UsersApi.applyAttaqueToPlayer(target, props.spell)
    }

    const attaqueDamage = (principale, secondaire, level) => {
        return Math.floor(50 + (level * 1.5 + 20 * Math.random()) + (Math.random() * (principale + level - secondaire - level) + secondaire) * 1.6)
    }

    return <>
        <div className="spell-container"  onClick={handleAttack}>
            {/*<div className="cooldown-filter" style={style}></div>*/}
            <div className="spell">
                <img src={"../../../img/gui/spells/spell-icon/2/" + props.spell.icone} className="img-spell"/>
            </div>
        </div>
    </>
}

export default Spell