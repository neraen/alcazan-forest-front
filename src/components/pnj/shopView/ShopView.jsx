import React  from "react"
import {connect} from "react-redux";
import {updateJoueurState} from "../../../store/actions";
import UserActionApi from "../../../services/UserActionApi";


const ShopView = (props) => {

    const handleAchat = async (item) => {
        const playerMoneyAfterBuy = +props.joueurState.money - +item.prixAchat;
        if(playerMoneyAfterBuy >= 0){
            const playerMoney = await UserActionApi.buyItem(item.idEquipement)
            props.updateJoueurState({money: playerMoney.money})
        }
    }

    return(
        <div className="shop-items">
            { props.items.map((item) =>

                <div className={"shop-item " + item.rarityName}>
                    <div className="shop-item-header">
                        {item.nomEquipement}
                    </div>
                    <div className="shop-item-body">
                        <div className="block-carac-img-item">
                            <img className="inventaire-item-img" src={'../img/equipement/'+item.position+'/'+item.icone}/>
                            <div className="shop-item-carac">
                                {item.caracteristiques.map((caracteristique) =>
                                    <div key={'caracteristique'+caracteristique.id}>
                                        {caracteristique.nom[0].toUpperCase()+caracteristique.nom.slice(1)} : + {caracteristique.valeur}
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="inventaire-item-element">
                            <div className="inventaire-item-element-strong">Prix : {item.prixAchat} Pièces d'or </div>

                        </div>
                    </div>
                    <div className="shop-item-footer">
                        Niveau requis : {item.levelMinEquipement}
                    </div>

                    <button onClick={() => handleAchat(item)}>Acheter</button>
                </div>
            )}
        </div>
    )
}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(ShopView)