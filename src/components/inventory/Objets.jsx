import React from "react";

const Objets = (props) => {
    return <>
        <div className="inventaire-layout">
            <div className="inventaire-left-part">
                <h4 className="inventaire-subtitle">Consommables</h4>
                <div className="inventaire-consommables">
                    <div className="inventaire-items">
                        { props.consommables && props.consommables.map((consommable) =>
                            <div className="inventaire-item" key={consommable.idConsommable}>
                                <img className="inventaire-item-img" src={'../img/consommable/'+consommable.imageConsommable}/>
                                <div className="inventaire-item-hover">
                                    <div className="inventaire-item-hover-header">
                                        {consommable.nomConsommable}
                                    </div>
                                    <div className="inventaire-item-hover-body">
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">Description : </div>
                                            <div className="inventaire-item-element-italic"> {consommable.descriptionConsommable} </div>
                                        </div>
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">valeur : {consommable.prixReventeConsommable} Pièces d'or </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <div className="inventaire-right-part">
                <h4 className="inventaire-subtitle">Objets</h4>
                <div className="inventaire-objets">
                    <div className="inventaire-items">
                        { props.objets && props.objets.map((objet) =>
                            <div className="inventaire-item" key={objet.idObjet}>
                                <img className="inventaire-item-img" src={'../img/objet/'+objet.imageObjet}/>
                                <div className="inventaire-item-hover">
                                    <div className="inventaire-item-hover-header">
                                        {objet.nomObjet}
                                    </div>
                                    <div className="inventaire-item-hover-body">
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">Description : </div>
                                            <div className="inventaire-item-element-italic"> {objet.descriptionObjet} </div>
                                        </div>
                                        <div className="inventaire-item-element">
                                            <div className="inventaire-item-element-strong">valeur : {objet.prixReventeObjet} Pièces d'or </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Objets;