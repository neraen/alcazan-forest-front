import React from 'react'
import Inventory from "../../components/inventory/inventory/Inventory";

const InventoryPage = (props) => {



    return <>
        <main className="main-inventory-page">
            <div className="side-block">
                {/*<UsernameBlock />*/}
                {/*<SideMenu />*/}
            </div>
            <Inventory {...props}/>
            <div className="footer-block">
                {/*<SpellBar />*/}
            </div>
        </main>
    </>
}

export default InventoryPage