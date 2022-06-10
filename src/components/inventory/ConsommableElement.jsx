import React from 'react'


 const ConsommableElement = (props) => {
    
    return (
        <div className="inventaire-item" ref={props.innerRef} key={props.consommable.idConsommable}>
            <img className="inventaire-item-img" src={'../img/consommables/'+props.consommable.imageConsommable}/>
            <div className="inventaire-item-hover">
                <div className="inventaire-item-hover-header">
                    {props.consommable.nomConsommable}
                </div>
                <div className="inventaire-item-hover-body">
                    <div className="inventaire-item-element">
                        <div className="inventaire-item-element-strong">Description : </div>
                        <div className="inventaire-item-element-italic"> {props.consommable.descriptionConsommable} </div>
                    </div>
                    <div className="inventaire-item-element">
                        <div className="inventaire-item-element-strong">valeur : {props.consommable.prixReventeConsommable} Pièces d'or </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsommableElement