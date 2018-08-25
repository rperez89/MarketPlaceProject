import React, { Component } from 'react'

class ManageStoreOwners extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storeOwnerAddress: '',
            storeOwnerList: this.props.storeOwnerList
        }

    }
    componentWillMount() {
        this.props.getStoreOwners();

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

    render() {
        console.log('storeOwners List')
        console.log(this.state.storeOwnerList)
        return (

            < form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit} >
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={this.state.storeOwnerAddress} onChange={this.onInputChange} placeholder="Address" />
                    <span className="pure-form-message">This is a required field.</span>

                    <br />

                    <button type="submit" className="pure-button pure-button-primary">Add</button>
                </fieldset>
            </form >
        )
    }
}

export default ManageStoreOwners
