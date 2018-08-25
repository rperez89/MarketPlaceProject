import React, { Component } from 'react'
import MarketPlace from '../../../build/contracts/MarketPlace.json'
import store from '../../store'
import _Store from '../../../build/contracts/Store.json'

const contract = require('truffle-contract');
let web3;
let theCoinbase;
let marketplace;

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props;
    web3 = store.getState().web3.web3Instance;

    web3.eth.getCoinbase((error, coinbase) => {
      // Log errors, if any.
      if (error) {
        console.error(error);
      }
      else {
        theCoinbase = coinbase;
      }
    })
    marketplace = contract(MarketPlace)
    marketplace.setProvider(web3.currentProvider)
  }


  addStore = () => {
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
      let marketplaceInstance;
      return function (dispatch) {

        marketplace.deployed().then(function (instance) {
          marketplaceInstance = instance;
          // Attempt to login user.
          marketplaceInstance.addStore('Store1', { from: theCoinbase })
            .then(function (result) {
              // If no error, update user.

              //dispatch(userUpdated({"name": name}))
              console.log('hola')
              console.dir(result);
              return alert('store created!');


            })
            .catch(function (result) {
              // If error...
            })
        })

      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }

  getStoresOfOwner = () => {
    if (typeof web3 !== 'undefined') {
      let marketplaceInstance;
      return function (dispatch) {

        marketplace.deployed().then(function (instance) {
          marketplaceInstance = instance;
          // Attempt to login user.
          marketplaceInstance.getStoresOfStoreOwner(theCoinbase, { from: theCoinbase })
            .then(function (result) {
              // If no error, update user.

              //dispatch(userUpdated({"name": name}))
              console.log('stores')
              console.dir(result);
              return alert('stores');


            })
            .catch(function (result) {
              // If error...
            })
        })

      }
    } else {
      console.error('Web3 is not initialized.');
    }
  };

  getStoreName = () => {
    let _store = contract(_Store);
    _store.setProvider(web3.currentProvider)
    console.log('before');
    let instance = _store.at('0x594ba7f7838b9231021d30d9b2b5299da3971a68')

    let name = instance.getStoreName.call({ from: theCoinbase }).then((_name) => { console.log(web3.toUtf8(_name)) });

  }


  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>

            <button onClick={this.addStore()}>AddStore</button>
            <button onClick={this.getStoresOfOwner()}>GetStores</button>
            <button onClick={this.getStoreName}>GetStoreName</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
