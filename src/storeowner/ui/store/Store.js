import React, { Component } from 'react'

class Store extends Component {

    constructor(props) {
        super(props)

        this.state = {
            storeOwnerAddress: '',
            storeList: [],
            currentStore: this.props.currentStore,
            storeAddress: this.props.storeAddress,
            storeName: this.props.storeName
        }
        let _stores = [];
    }
    componentWillMount() {
        //this._stores = this.props.getStores();
        //this._stores.push(this.props.currentStore);
        //this.setState(() => ({ storeList: _storeList }));
        const storeName = this.props.storeName
        console.log('NAME2')
        console.log(storeName)




    }

    componentDidUpdate(prevProps) {
        // this._stores = this.props.storeList
        // if (prevProps.currentStore !== this.props.currentStore) {
        //     this._stores.push(this.props.currentStore)
        // }
        //const storeName = this.props.getCurrentStoreName();


    }

    onInputChange = (event) => {
        this.setState({ storeOwnerAddress: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        //  if (this.state.storeOwnerAddress < 42) {
        //      return alert('Please fill in the store owner address.')
        // }

        //this.props.onSignUpFormSubmit(this.state.storeOwnerAddress)
        this.props.getCurrentStoreName();

    }

    handleStoreOnClik = (storeAddress) => {
        console.log(storeAddress)
        this.props.onStoreClick(storeAddress);
    }

    render() {
        /* if (this.props.currentStore) {
             this._stores.push(this.props.currentStore)
         }*/


        return (
            <div>
                <div>
                    <h1> {this.props.storeName && this.props.storeName} </h1>
                    <h2> Add a new Product</h2>
                </div>
                < form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit} >
                    <fieldset>
                        <label htmlFor="name">Name </label>
                        <input id="name" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Product Name" />
                        <span className="pure-form-message">This is a required field.</span>

                        <label htmlFor="price">Price </label>
                        <input id="price" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Product Price" />
                        <span className="pure-form-message">This is a required field.</span>

                        <label htmlFor="quantity">Quantity </label>
                        <input id="quantity" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Product Quantity" />
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
