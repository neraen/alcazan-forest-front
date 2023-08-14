import {connect} from "react-redux";
import {fetchTargetInfo, removePlayerTarget, updateJoueurState} from "../../../store/actions";
import React, {useEffect, useState} from "react";
import BuffApi from "../../../services/BuffApi";
import Consommable from "../../consommable/Consommable";

const Buff = () => {

    const [buffs, setBuffs] = useState([])

    useEffect(() => {
        getActiveBuff();
    }, [])

    const getActiveBuff = async () => {
        const buffs = await BuffApi.getActiveBuff();
        setBuffs(buffs);
    }

    return (
        <div className="buffs">
            {buffs && buffs.map(buff => (
                <div  className="buff" key={buff.id} style={{backgroundImage: "url(../img/spell/"+buff.icone+")"}}>

                    <div className="buff-hover">
                        <strong>{buff.name}</strong><br />
                        {buff.caracteristiques && buff.caracteristiques.map(caracteristique => (
                            <em> + {caracteristique.value} {caracteristique.nom} | </em>
                        ))}
                    </div>
                </div>
            ))}
            {(buffs && buffs.length < 6) && [...Array(6 - buffs.length)].map((x, i) =>
                <>
                    <div  className="buff" key={i}>

                    </div>

                </>
            )}
        </div>
    )
}

export default connect((state, ownProps) => {
    return {joueurState: state.data.joueurState, ownProps};
}, {updateJoueurState})(Buff);