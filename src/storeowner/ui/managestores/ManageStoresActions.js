import MarketPlaceContract from '../../../../build/contracts/MarketPlace.json'
import store from '../../../store'
import getWeb3 from '../../../util/web3/getWeb3'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const STORE_ADDED = 'STORE_ADDED'
export const GET_STORES = 'GET_STORES'
export const STORE_SELECTED = 'STORE_SELECTED'

function storeAdded(storeName) {
    return {
        type: STORE_ADDED,
        payload: storeName
    }
}

function storeSelected(storeAddress) {
    return {
        type: STORE_SELECTED,
        payload: storeAddress
    }
}

function get_Stores(storeList) {
    return {
        type: GET_STORES,
        payload: storeList
    }
}

export function getStores() {
    let web3 = store.getState().web3.web3Instance

    if (typeof web3 !== 'undefined') {
        console.log('getStores called')
        return function (dispatch) {
            // Using truffle-contract we create the authentication object.
            const marketplace = contract(MarketPlaceContract)
            marketplace.setProvider(web3.currentProvider)

            // Declaring this for later so we can chain functions on MarketPlace.
            var marketplaceInstance

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }


                marketplace.deployed().then(function (instance) {
                    marketplaceInstance = instance

                    // Attempt to sign up user.
                    marketplaceInstance.getStoresOfStoreOwner(coinbase, { from: coinbase })
                        .then(function (result) {
                            // If no error, login user.
                            console.log('STORES DEL OWNER')
                            console.log(result);
                            return dispatch(get_Stores(result))
                        })
                        .catch(function (result) {
                            console.log(result);
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function getStoreSelected(storeAddress) {

    var currentLocation = browserHistory.getCurrentLocation()

    if ('redirect' in currentLocation.query) {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    }
    return function (dispatch) {
        dispatch(storeSelected(storeAddress))
        return browserHistory.push('/store')
    }
    console.log('storeSelected');
    console.log(storeAddress)



}

export function addStore(storeName) {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function (dispatch) {
            // Using truffle-contract we create the authentication object.
            const marketplace = contract(MarketPlaceContract)
            marketplace.setProvider(web3.currentProvider)

            // Declaring this for later so we can chain functions on MarketPlace.
            var marketplaceInstance

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                marketplace.deployed().then(function (instance) {
                    marketplaceInstance = instance


                    marketplaceInstance.addStore(storeName, { from: coinbase })
                        .then(function (result) {
                            console.log('addStore Result')
                            console.log(result)
                            return dispatch(storeAdded(storeName))

                        })
                        .catch(function (result) {

                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

