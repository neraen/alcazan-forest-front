import React, {useState} from "react"
import GuildeApi from "../../services/GuildeApi";

class Guilde extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            joueurs: []
        }
    }

    componentDidMount() {
        this.fetchGuildeData()
    }

    async fetchGuildeData(){
        const guildeInfos = await GuildeApi.fetchGuildeData();
        this.setState({
            joueurs: guildeInfos.joueurs
        }, () => {
            console.log(this.state.joueurs)
        })
    }

    render() {
        return(
            <>
                <table className="table-guilde">
                    <tr className="tr-table-guilde">
                        <th className="td-table-guilde">Pseudo</th>
                        <th className="td-table-guilde">Grade</th>
                        <th className="td-table-guilde">Classe</th>
                        <th className="td-table-guilde">Niveau</th>
                        <th className="td-table-guilde">Statut</th>
                    </tr>
                    {this.state.joueurs && this.state.joueurs.map(joueur => {
                        return <tr className="tr-table-guilde">
                            <td className="td-table-guilde">{joueur.pseudo}</td>
                            <td className="td-table-guilde">{joueur.grade}</td>
                            <td className="td-table-guilde">{joueur.classeName}</td>
                            <td className="td-table-guilde">{joueur.niveau}</td>
                            <td className="td-table-guilde">Connecté</td>
                        </tr>
                    })}
                </table>
            </>
        )
    }
}

export default Guilde