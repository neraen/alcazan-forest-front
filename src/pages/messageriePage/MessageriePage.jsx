import React from "react";
import Contacts from "../../components/social/messagerie/Contacts";
import Messenger from "../../components/social/messagerie/Messenger";

class MessageriePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return (<>
            <main className="messagerie-page">
                <h1 className="text-center title-map-font banner-map banner-map-inventory">Messagerie</h1>
                <div className="messagerie-main">
                    <div className="contact-component col-2">
                        <Contacts />
                    </div>
                    <div className="messenger-component col-10">
                        <Messenger />
                    </div>
                </div>
            </main>
        </>  )
    }
}

export default MessageriePage