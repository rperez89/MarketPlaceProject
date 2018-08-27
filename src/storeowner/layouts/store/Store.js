import React, { Component } from 'react'
import StoreContainer from '../../ui/store/StoreContainer'

class Store extends Component {
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <p></p>
                        <StoreContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default Store