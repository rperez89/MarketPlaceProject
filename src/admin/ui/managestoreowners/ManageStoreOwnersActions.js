import MarketPlaceContract from '../../../../build/contracts/MarketPlace.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const STOREOWNER_ADDED = 'STOREOWNER_ADDED'
export const GET_STOREOWNERS = 'GET_STOREOWNERS'
export const SET_ADDRESS = 'SET_ADDRESS'

function userAdded() {
    return {
        type: STOREOWNER_ADDED,
        //payload: storeOwnerList
    }
}

function callGetStoreOwners(storeOwnerList) {
    return {
        type: GET_STOREOWNERS,
        payload: storeOwnerList
    }
}

function setUserAddress(_address) {
    return {
        type: SET_ADDRESS,
        payload: _address
    }
}

export function getAccountAddress() {
    let web3 = store.getState().web3.web3Instance
    return function (dispatch) {
        web3.eth.getCoinbase((error, coinbase) => {
            // Log errors, if any.
            if (error) {
                console.error(error);
            }
            else {
                console.log('coinbase');
                console.log(coinbase);
                dispatch(setUserAddress(coinbase))
            }

        })
    }
}

export function getStoreOwners() {
    let web3 = store.getState().web3.web3Instance
    console.log('getStoreOwners called')
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

                console.log('StoreOwnersList1')
                marketplace.deployed().then(function (instance) {
                    marketplaceInstance = instance

                    // Attempt to sign up user.
                    marketplaceInstance.getStoreOwners({ from: coinbase })
                        .then(function (result) {
                            // If no error, login user.
                            console.log('StoreOwnersList')
                            console.log(result);
                            return dispatch(callGetStoreOwners(result))
                        })
                        .catch(function (result) {
                            // If error...
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function addStoreOwner(storeOwnerAddress) {
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

                    // Attempt to sign up user.
                    marketplaceInstance.addStoreOwner(storeOwnerAddress, { from: coinbase })
                        .then(function (result) {
                            console.log('addStoreOwnerResult')
                            console.log(result)
                            // If no error, login user.
                            getStoreOwners()
                        })
                        .catch(function (result) {
                            // If error...
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

