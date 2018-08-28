import React, { Component } from 'react'
import store from '../../store'
import getWeb3 from '../../util/web3/getWeb3'


class Home extends Component {

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to the MarketPlace</h1>
            <p>Click on Login to start</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
