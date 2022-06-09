import React, {useEffect, useState} from "react";
import ConsommableElement from "./ConsommableElement";
import ObjetElement from "./ObjetElement";
import SpellBar from "../UserInterface/SpellBar";
import Spell from "../spells/Spell";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

class Objets extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            consommable: props.consommable,
            equipedConsommable: []
        }
    }


   componentDidMount() {
       this.fetchEquipedConsommable()
   }

    fetchEquipedConsommable = () => {

    }

    id2List = {
        droppable: 'consommable',
        droppable2: 'equipedConsommable'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { equipedConsommable: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                consommable: result.droppable,
                equipedConsommable: result.droppable2
            });
        }
    };

    render() {
        return <>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="inventaire-layout">
                    <div className="inventaire-left-part">
                        <h4 className="inventaire-subtitle">Consommables</h4>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div className="inventaire-consommables">
                                    <div className="inventaire-items">
                                        { this.props.consommables && this.props.consommables.map((consommable, index) =>
                                            <Draggable
                                                key={consommable.id}
                                                draggableId={consommable.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <ConsommableElement ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        consommable={consommable} />
                                                )}
                                            </Draggable>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="inventaire-right-part">
                        <h4 className="inventaire-subtitle">Objets</h4>
                        <div className="inventaire-objets">
                            <div className="inventaire-items">
                                { this.props.objets && this.props.objets.map((objet) =>
                                    <ObjetElement objet={objet}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} className="spells row align-items-center">

                            <Draggable key={'1'} draggableId={'1'} index={1}>
                                {(provided, snapshot) => (
                                    <div  ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps} className="spell spell-inventaire" >

                                    </div>
                                )}
                            </Draggable>
                            <Draggable key={'2'} draggableId={'2'} index={2}>
                                {(provided, snapshot) => (
                                    <div   ref={provided.innerRef}
                                           {...provided.draggableProps}
                                           {...provided.dragHandleProps} className="spell spell-inventaire">

                                    </div>
                                )}
                            </Draggable>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    }
}



export default Objets;