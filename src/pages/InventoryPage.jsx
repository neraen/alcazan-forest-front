import React, {useEffect} from 'react'
import UsernameBlock from "../components/UserInterface/UsernameBlock";
import SideMenu from "../components/UserInterface/SideMenu";
import SpellBar from "../components/UserInterface/SpellBar";
import Inventory from "../components/Inventory";

const InventoryPage = (props) => {



    return <>
        <main className="main-inventory-page">
            <div className="side-block">
                {/*<UsernameBlock />*/}
                {/*<SideMenu />*/}
            </div>
            <Inventory />
            <div className="footer-block">
                {/*<SpellBar />*/}
            </div>
        </main>
    </>
}

export default InventoryPage