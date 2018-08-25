import React, { Component } from 'react'
import ManageStoreOwnersContainer from '../../ui/managestoreowners/ManageStoreOwnersContainer'

class ManageStoreOwners extends Component {
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Store Owners</h1>
                        <p>Add store owners here.</p>
                        <ManageStoreOwnersContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default ManageStoreOwners