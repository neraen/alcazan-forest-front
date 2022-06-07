import React from "react";
import ConsommableElement from "./ConsommableElement";
import ObjetElement from "./ObjetElement";
import SpellBar from "../UserInterface/SpellBar";

const Objets = (props) => {
    return <>
        <div className="inventaire-layout">
            <div className="inventaire-left-part">
                <h4 className="inventaire-subtitle">Consommables</h4>
                <div className="inventaire-consommables">
                    <div className="inventaire-items">
                        { props.consommables && props.consommables.map((consommable) =>
                           <ConsommableElement consommable={consommable} />
                        )}
                    </div>
                </div>
            </div>
            <div className="inventaire-right-part">
                <h4 className="inventaire-subtitle">Objets</h4>
                <div className="inventaire-objets">
                    <div className="inventaire-items">
                        { props.objets && props.objets.map((objet) =>
                           <ObjetElement objet={objet}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Objets;