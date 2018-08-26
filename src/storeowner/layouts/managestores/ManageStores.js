import React, { Component } from 'react'
import ManageStoresContainer from '../../ui/managestores/ManageStoresContainer'

class ManageStores extends Component {
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Stores</h1>
                        <p>Add stores here.</p>
                        <ManageStoresContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default ManageStores