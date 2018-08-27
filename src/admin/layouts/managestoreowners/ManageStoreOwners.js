import React, { Component } from 'react'
import ManageStoreOwnersContainer from '../../ui/managestoreowners/ManageStoreOwnersContainer'

class ManageStoreOwners extends Component {
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">

                        <ManageStoreOwnersContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default ManageStoreOwners