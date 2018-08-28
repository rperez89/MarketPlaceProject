
var Store = artifacts.require("./Store.sol");

contract('Store', function (accounts) {

    const owner = accounts[0]
    const storeName = 'TestStore'
    let storeConstractInstance = null;

    /**
   * @dev Set the Store contract instance so all the test can use the same
   */
    before('setup contract for test', async () => {
        storeContractInstance = await Store.new(owner, storeName);
    })

    /**
   * @dev Check that the store was created with the name TestStore
   */
    it('store name should be TestStore', async () => {
        let storeName = await storeContractInstance.getStoreName.call({ from: owner })

        assert.equal(storeName, 'TestStore', 'Store name is not TestStore')
    });

    /**
    * @dev Check that a new product was added  and after that get the product by id to compare the attributes
    */
    it("should add a product with id: 1, name: Product1, price: 500, stock: 10.", async () => {
        await storeContractInstance.addNewProduct(1, 'Product1', 500, 10, { from: accounts[0] })
        const ProductAdded = await storeContractInstance.ProductAdded()

        const log = await new Promise(function (resolve, reject) {
            ProductAdded.watch(function (error, log) { resolve(log); });
        });
        const productId = log.args.productId.toNumber()
        const product = await storeContractInstance.getProduct(productId, { from: owner })
        const productName = product[0]
        const productPrice = product[1]
        const productStock = product[2]


        assert.equal(productName, 'Product1', "Incorrect Product name")
        assert.equal(productPrice, 500, "Incorrect Product price")
        assert.equal(productStock, 10, "Incorrect Product stock")
        assert.equal(productId, 1, "Incorrect Product id")
    })

    /**
    * @dev Check if the product price can be updated
    */
    it("should update product 1 price from 500 to 100000", async () => {
        await storeContractInstance.updateProductPrice(1, 100000, { from: accounts[0] })
        const product = await storeContractInstance.getProduct(1, { from: owner })
        const productPrice = product[1]
        assert.equal(productPrice, 100000, "Incorrect Product price")
    })

    /**
    * @dev Check if the product was succesfully bought, store balance and product quantity must change
    */
    it('should buy product with id:1, decrease product quantity by 1 and increase the store balance by 100000 ', async () => {
        await storeContractInstance.buyProduct(1, 1, { from: accounts[1], value: web3.toBigNumber(2000000000000) })
        const product = await storeContractInstance.getProduct(1, { from: owner })
        const productStock = product[2]
        const storeBalance = await storeContractInstance.balance.call({ from: owner });
        assert.equal(Number(productStock), 9, "Incorrect Product stock number")
        assert.equal(Number(storeBalance), 2000000000000, "Incorrect store balance")
    })

    it('should withdraw all the store balance to the owner ', async () => {
        function getTransactionGasCost(tx) {
            let transaction = web3.eth.getTransactionReceipt(tx);
            let amount = transaction.gasUsed;
            let price = web3.eth.getTransaction(tx).gasPrice;

            return web3.toBigNumber(price * amount);
        }
        let initialBalance = web3.eth.getBalance(owner);
        let initBalance = web3.fromWei(initialBalance)
        const storeBalance = await storeContractInstance.balance.call({ from: owner });
        let withdrawal = await storeContractInstance.withdraw({ from: owner });
        var finalBalance = web3.eth.getBalance(owner);
        let finBalance = web3.fromWei(finalBalance)
        const storeBalance2 = await storeContractInstance.balance.call({ from: owner });
        let gasCost = getTransactionGasCost(withdrawal["tx"]);
        let gCost = web3.fromWei(gasCost);
        finalBalance.minus(initialBalance).minus(gasCost);
        const ret = 'initStoreBalance: ' + storeBalance.toString() + 'initial: ' + initBalance.toString() + ' gCost: ' + gCost.toString() + ' FinalStoreBalance: ' + storeBalance2.toString()

        assert.equal(
            Number(finBalance.toNumber()),
            1,
            ret
        );


    })


});


