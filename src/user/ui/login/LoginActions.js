import MarketPlace from '../../../../build/contracts/MarketPlace.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export function loginUser() {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function (dispatch) {
            const marketplace = contract(MarketPlace)
            marketplace.setProvider(web3.currentProvider)

            var marketplaceInstance

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                marketplace.deployed().then(function (instance) {
                    marketplaceInstance = instance

                    // Attempt to login user.
                    marketplaceInstance.accountHasRole(coinbase, 'admin', { from: coinbase })
                        .then(function (result) {
                            // If no error, login user.
                            //var userName = web3.toUtf8(result)

                            dispatch(userLoggedIn({ "name": 'userName' }))

                            // Used a manual redirect here as opposed to a wrapper.
                            // This way, once logged in a user can still access the home page.
                            var currentLocation = browserHistory.getCurrentLocation()

                            if ('redirect' in currentLocation.query) {
                                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                            }
                            console.log('result Admin: ' + result);
                            if (result == true) {
                                return browserHistory.push('/managestoreowners')
                            }
                        })
                        .catch(function (result) {
                            // If error, go to signup page.
                            console.error('Wallet ' + coinbase + ' does not have an account!')

                            return browserHistory.push('/signup')
                        });

                    marketplaceInstance.accountHasRole(coinbase, 'storeowner', { from: coinbase })
                        .then(function (result) {
                            // If no error, login user.
                            //var userName = web3.toUtf8(result)

                            dispatch(userLoggedIn({ "name": coinbase }))

                            // Used a manual redirect here as opposed to a wrapper.
                            // This way, once logged in a user can still access the home page.
                            var currentLocation = browserHistory.getCurrentLocation()

                            if ('redirect' in currentLocation.query) {
                                return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                            }
                            console.log('result StoreOwner: ' + result);
                            if (result == true) {
                                return browserHistory.push('/managestores')
                            }
                        })
                        .catch(function (result) {
                            // If error, go to signup page.
                            console.error('Wallet ' + coinbase + ' does not have an account!')

                            return browserHistory.push('/signup')
                        })

                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}
