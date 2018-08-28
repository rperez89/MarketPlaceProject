var MarketPlace = artifacts.require("./MarketPlace.sol");
var Store = artifacts.require("./Store.sol");

contract('MarketPlace', function (accounts) {

    /**
  * @dev Check if when the contract is deployed the admin is added
  */
    it("should have admin role", function () {
        return MarketPlace.deployed().then(async (instance) => {
            MarketPlaceInstance = instance;
            const adminRole = await MarketPlaceInstance.accountHasRole(accounts[0], 'admin', { from: accounts[0] });
            assert.equal(adminRole, true, 'account is admin')
        })
    })

    /**
   * @dev Check an storeowner is added by calling accountHasRole after adding it.
   */
    it("...should add the storeOwner 0x47259D94C533DB3fed98029feB2aF898DbDCA4DF.", function () {
        return MarketPlace.deployed().then(function (instance) {
            MarketPlaceInstance = instance;

            return MarketPlaceInstance.addStoreOwner('0x47259D94C533DB3fed98029feB2aF898DbDCA4DF', { from: accounts[0] });
        }).then(function () {
            return MarketPlaceInstance.accountHasRole.call('0x47259D94C533DB3fed98029feB2aF898DbDCA4DF', 'storeowner', { from: accounts[0] });
        }).then(function (hasStoreOwnerRole) {
            assert.equal(hasStoreOwnerRole, true, "The address 0x47259D94C533DB3fed98029feB2aF898DbDCA4DF was not added as storeowner.");
        });
    })

    /**
  * @dev Check if has storeowner role
  */
    it("should have storeOwner role", function () {
        return MarketPlace.deployed().then(async (instance) => {
            MarketPlaceInstance = instance;
            const storeOwnerRole = await MarketPlaceInstance.accountHasRole('0x47259D94C533DB3fed98029feB2aF898DbDCA4DF', 'storeowner', { from: accounts[0] });
            assert.equal(storeOwnerRole, true, 'account is storeowner')
        })
    })

    /**
   * @dev Check if  the store was created by comparing the name
   */
    it("Should create a new store with name TestStore", function () {
        return MarketPlace.deployed().then(async (instance) => {
            MarketPlaceInstance = instance;

            await MarketPlaceInstance.addStoreOwner('0x6df53bF545a84B927356E628cf1Db32E52Cb026d', { from: accounts[0] });
            await MarketPlaceInstance.addStore('TestStore', { from: '0x6df53bF545a84B927356E628cf1Db32E52Cb026d' });
            const stores = await MarketPlaceInstance.getStoresOfStoreOwner.call('0x6df53bF545a84B927356E628cf1Db32E52Cb026d', { from: '0x6df53bF545a84B927356E628cf1Db32E52Cb026d' });
            const store = await Store.at(stores[0])
            const storeName = await store.getStoreName.call({ from: '0x6df53bF545a84B927356E628cf1Db32E52Cb026d' })

            assert.equal(storeName, 'TestStore', 'TestStore not created correctly')
        })
    })

    /**
  * @dev Check if all the stores are returned
  */
    it("Should be 3 stores created", function () {
        return MarketPlace.deployed().then(async (instance) => {
            MarketPlaceInstance = instance;
            await MarketPlaceInstance.addStoreOwner('0x2791Ac69602f464B02738753381b29a2C9F0294C', { from: accounts[0] });
            await MarketPlaceInstance.addStore('TestStore', { from: '0x2791Ac69602f464B02738753381b29a2C9F0294C' });
            await MarketPlaceInstance.addStore('TestStore2', { from: '0x2791Ac69602f464B02738753381b29a2C9F0294C' });
            const stores = await MarketPlaceInstance.getAllStores.call({ from: '0x2791Ac69602f464B02738753381b29a2C9F0294C' });
            const storesCount = stores.length;

            assert.equal(storesCount, 3, 'The numbers of stores does not match')
        })
    })


});