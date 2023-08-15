import React from 'react'

const ProfilSpellBar = (props) => {
    return <>
        <div className="spell-bar m-auto mt-5 d-flex flex-column justify-content-center align-items-center px-4">
            <div className="spells align-items-center">
                <div className="d-flex">
                    {props.spells && props.spells.map(spell => (
                        <div key={spell.id} title={spell.nom} className="spell-container">
                            <div  className="spell">
                                <img src={"../../../img/spell/" + spell.icone} alt={spell.nom} className="img-spell"/>
                            </div>
                        </div>
                    ))}
                    {props.spells && [...Array(8 - props.spells.length)].map((x, i) =>
                        <div  className="spell" key={i}>

                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default ProfilSpellBar