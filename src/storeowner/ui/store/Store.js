import React, { Component } from 'react'

class Store extends Component {

    constructor(props) {
        super(props)

        this.state = {
            storeOwnerAddress: '',
            storeList: [],
            currentStore: this.props.currentStore,
            storeAddress: this.props.storeAddress
        }
        let _stores = [];
    }
    componentWillMount() {
        //this._stores = this.props.getStores();
        //this._stores.push(this.props.currentStore);
        //this.setState(() => ({ storeList: _storeList }));

    }

    componentDidUpdate(prevProps) {
        // this._stores = this.props.storeList
        // if (prevProps.currentStore !== this.props.currentStore) {
        //     this._stores.push(this.props.currentStore)
        // }
    }

    onInputChange = (event) => {
        this.setState({ storeOwnerAddress: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.storeOwnerAddress < 42) {
            return alert('Please fill in the store owner address.')
        }

        this.props.onSignUpFormSubmit(this.state.storeOwnerAddress)

    }

    handleStoreOnClik = (storeAddress) => {
        console.log(storeAddress)
        this.props.onStoreClick(storeAddress);
    }

    render() {
        /* if (this.props.currentStore) {
             this._stores.push(this.props.currentStore)
         }*/
        console.log('storeAddress')
        console.log(this.props.storeAddress)

        return (
            <div>
                < form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit} >
                    <fieldset>
                        <label htmlFor="name">Storeeeeeeeeeee</label>
                        <input id="name" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Store Name" />
                        <span className="pure-form-message">This is a required field.</span>

                        <br />


                        <button type="submit" className="pure-button pure-button-primary">Add</button>
                    </fieldset>
                </form >


            </div>
        )
    }
}

export default Store
