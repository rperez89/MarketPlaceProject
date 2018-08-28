import MarketPlaceContract from '../../../../build/contracts/MarketPlace.json'
import _Store from '../../../../build/contracts/Store.json'
import store from '../../../store'
import getWeb3 from '../../../util/web3/getWeb3'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export const STORE_ADDED = 'STORE_ADDED'
export const GET_STORES = 'GET_STORES'
export const STORE_SELECTED = 'STORE_SELECTED'
export const GET_STORE_NAME = 'GET_STORE_NAME'
export const GET_STORE_INFO = 'GET_STORE_INFO'

function storeAdded(storeName) {
    return {
        type: STORE_ADDED,
        payload: storeName
    }
}

function storeSelected(storeAddress, instance) {
    return {
        type: STORE_SELECTED,
        payload: storeAddress,
        storeInstance: instance
    }
}

function get_StoreName(_storeName) {
    return {
        type: GET_STORE_NAME,
        storeName: _storeName
    }
}

function get_StoreInfo(_storeInfo) {
    return {
        type: GET_STORE_INFO,
        storeInfo: _storeInfo
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
        let web3 = store.getState().web3.web3Instance
        web3.eth.getCoinbase((error, coinbase) => {
            let _store = contract(_Store);
            _store.setProvider(web3.currentProvider)
            let instance = _store.at(storeAddress)
            let name = instance.getStoreName.call({ from: coinbase }).then((_name) => {
                console.log(web3.toUtf8(_name))
                dispatch(get_StoreName(web3.toUtf8(_name)))
            });

            dispatch(storeSelected(storeAddress, instance))
            return browserHistory.push('/store')
        })
    }
}

export function getStoreName() {

    let storeInstance = store.getState().storeowner.storeInstance
    if (storeInstance !== null) {
        console.log('NOTNULLLL')
        return function (dispatch) {
            let web3 = store.getState().web3.web3Instance
            web3.eth.getCoinbase((error, coinbase) => {

                storeInstance.getStoreInfo.call({ from: coinbase }).then((_name) => {
                    console.log('_name: ' + _name)
                    dispatch(get_StoreName(web3.toUtf8(_name)))
                });

            })
        }
    } else {
        console.log('NULLLLL')
    }
}

export function getStoreInfo() {

    let storeInstance = store.getState().storeowner.storeInstance
    if (storeInstance !== null) {
        console.log('GETSTOREINFO')
        return function (dispatch) {
            let web3 = store.getState().web3.web3Instance
            web3.eth.getCoinbase((error, coinbase) => {

                storeInstance.getStoreInfo.call({ from: coinbase }).then((info) => {
                    console.log('info: ' + info)
                    dispatch(get_StoreInfo(info))
                });

            })
        }
    } else {
        console.log('NULLLLL')
    }
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

