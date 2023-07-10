import React from 'react'


const ObjetElement = (props) => {
    return (
        <div className="inventaire-item" key={props.objet.idObjet}>
            <img className="inventaire-item-img" src={'../img/objet/'+props.objet.imageObjet}/>
            <div className="inventaire-item-hover">
                <div className="inventaire-item-hover-header">
                    {props.objet.nomObjet}
                </div>
                <div className="inventaire-item-hover-body">
                    <div className="inventaire-item-element">
                        <div className="inventaire-item-element-strong">Description : </div>
                        <div className="inventaire-item-element-italic"> {props.objet.descriptionObjet} </div>
                    </div>
                    <div className="inventaire-item-element">
                        <div className="inventaire-item-element-strong">valeur : {props.objet.prixReventeObjet} Pièces d'or </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ObjetElement;
