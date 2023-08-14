import React from "react"
import {connect} from "react-redux";
import {updateJoueurState} from "../../../store/actions";
import UserActionApi from "../../../services/UserActionApi";
import pnjApi from "../../../services/pnjApi";



class GuildeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guildes : [],
            dialogue: '',
            indexDialogue: 0,
            writtedDialogue: '',
            intervalId: 0
        }
    }

    componentDidMount() {
        this.fetchGuildeData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.indexDialogue === this.state.dialogue.length){
            clearInterval(this.state.intervalId);
        }
        return true;
    }


    fetchGuildeData = async () => {
        const guildeData = await pnjApi.getPnjGuilde(this.props.pnjId)

        this.setState({
            guildes: guildeData.guildes,
            dialogue: guildeData.dialogue
        }, () => {

            const intervalId = setInterval(this.autoWrite, 45);

            this.setState({
                intervalId: intervalId
            })
        });

    }

    handleChoiseGuilde = async (link, params, actionId) => {
        const messageData = await UserActionApi.applyUserAction(link, params, actionId);
        //toast(messageData.message);
    }

    autoWrite = () => {

        if(this.state.indexDialogue === this.state.dialogue.length) {
            this.setState({
                indexDialogue: this.state.indexDialogue
            })
        }else{
            console.log(this.state.indexDialogue)
            this.setState({
                indexDialogue: this.state.indexDialogue + 1
            })
        }

        this.setState({
            writtedDialogue: this.state.dialogue.slice(0, this.state.indexDialogue)
        })
    }

    handleJoinGuilde = (guildeId) => {
        const message = UserActionApi.joinGuilde(guildeId);
        //toast(message);
    }



    render(){
        return(
            <div className="quest-modal-body">
                <div className="guilde-body-transition dungeons-font">{this.state.writtedDialogue && this.state.writtedDialogue}</div><br />
                {this.state.guildes && this.state.guildes.length > 0 && (
                    <>
                        <h2 className="title-guilde-list">Liste des guildes</h2>
                        <table className="table-guilde-list">
                            <tr className="tr-guilde-list">
                                <th className="th-guilde-list">Nom</th>
                                <th className="th-guilde-list">Description</th>
                                <th className="th-guilde-list">Niveau</th>
                                <th className="th-guilde-list">Icone</th>
                                <th className="th-guilde-list">Actions</th>
                            </tr>
                            {this.state.guildes.map(guilde => (
                                <tr key={guilde.id} className="tr-guilde-list">
                                    <td className="th-guilde-list">{guilde.nom}</td>
                                    <td className="th-guilde-list">{guilde.description}</td>
                                    <td className="th-guilde-list">{guilde.niveau}</td>
                                    <td className="th-guilde-list">{guilde.icone}</td>
                                    <td className="th-guilde-list flex-row">
                                        <button onClick={() => this.handleJoinGuilde(guilde.id)}>Rejoindre</button>
                                        <button>Détails</button>
                                    </td>
                                </tr>

                            ))}
                        </table>
                    </>
                    )}
            </div>
        )
    }

}

export default connect((state, ownProperties) =>{
    return {joueurState: {...state.data.joueurState}, ownProperties}
}, {updateJoueurState})(GuildeView)