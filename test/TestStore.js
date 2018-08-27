
var Store = artifacts.require("./Store.sol");

contract('Store', function (accounts) {
    it("should add a product with id: 1, name: Product1, price: 500000, stock: 10.", function () {
        return Store.new('Store1', { from: accounts[0] }).then(function (instance) {
            StoreInstance = instance;

            return this.StoreInstance.addNewProduct(1, 'Product1', 500000, 10, { from: accounts[0] });
        }).then(function () {
            return this.StoreInstance.getProduct(1, { from: accounts[0] });
        }).then(function (info) {

            if (info[0] === 'Product1' && info[1] === 500000 && info[2] === 10) {
                assert.equal(1, 1, "Is not the same product");
            } else {
                if (info[0] != 'Product1') {
                    assert.equal(info[0], 'Product1', "Is not the same name");
                }
                if (info[1] != 500000) {
                    assert.equal(info[1].toString(), '500000', "Is not the same price");
                }
                if (info[2] != 10) {
                    assert.equal(info[2].toString(), '10', "Is not the same quantity");
                }
            }

        });
    })

});