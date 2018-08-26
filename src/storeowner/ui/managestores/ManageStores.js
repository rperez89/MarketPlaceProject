import React, { Component } from 'react'

class ManageStores extends Component {

    constructor(props) {
        super(props)

        this.state = {
            storeOwnerAddress: '',
            storeList: [],
            currentStore: this.props.currentStore
        }
        let _stores = [];
    }
    componentWillMount() {
        this._stores = this.props.getStores();
        //this._stores.push(this.props.currentStore);
        //this.setState(() => ({ storeList: _storeList }));

    }

    componentDidUpdate(prevProps) {
        //this._stores = this.props.storeList
        if (prevProps.currentStore !== this.props.currentStore) {
            this._stores.push(this.props.currentStore)
        }
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
        const list = this.state.storeList;
        list.push(this.state.storeOwnerAddress);
        console.log('listaaa');
        console.log(list);
        this.setState({ storeList: list })
    }

    render() {
        /* if (this.props.currentStore) {
             this._stores.push(this.props.currentStore)
         }*/
        console.log('stores List props')
        console.log(this.props.storeList)
        console.log('stores List')
        console.log(this.state.storeList)
        console.log('storessss')
        console.log(this._stores)
        console.log('currentStore')
        console.log(this.props.currentStore)
        return (
            <div>
                < form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit} >
                    <fieldset>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Store Name" />
                        <span className="pure-form-message">This is a required field.</span>

                        <br />

                        <button type="submit" className="pure-button pure-button-primary">Add</button>
                    </fieldset>
                </form >

                <ul>
                    {this._stores ? this._stores.map((store, index) => { return <li key={index}>{store}</li> }) :
                        this.props.storeList.map((store, index) => { return <li key={index}>{store}</li> })
                    }
                </ul>
            </div>
        )
    }
}

export default ManageStores
