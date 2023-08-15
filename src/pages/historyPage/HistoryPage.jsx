import React from 'react'
import Historique from "../../components/historique/Historique";


 class HistoryPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

     async componentDidMount() {
         this.setState({})
     }

    render(){
        return (<>
            <main className="history-page">
                <h1 className="text-center title-map-font banner-map banner-map-inventory">Historique</h1>
                <Historique />
            </main>
        </>  )
    }
}

export default HistoryPage;