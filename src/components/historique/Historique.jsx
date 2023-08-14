import React, {useState} from "react"
import GuildeApi from "../../services/GuildeApi";
import HistoriqueApi from "../../services/HistoriqueApi";

class Historique extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            historyRows: []
        }
    }

    componentDidMount() {
        this.fetchHistoriqueData()
    }

    async fetchHistoriqueData(){
        const historiqueInfos = await HistoriqueApi.fetchHistoryData();
        this.setState({
            historyRows: historiqueInfos.rows
        }, () => {
            console.log(this.state.historyRows)
        })
    }

    render() {
        return(
            <div className="history-rows">
                    {this.state.historyRows && this.state.historyRows.map(historyRow => {
                        return <div className={"history-row "+ (historyRow.isExternal && "history-row-right")}>
                            <div className="history-row-header"> {historyRow.date.date}</div>
                            <div className="history-row-content"> {historyRow.message} </div>
                        </div>
                    })}
            </div>
        )
    }
}

export default Historique