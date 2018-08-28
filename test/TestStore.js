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
        await storeContractInstance.buyProduct(1, 1, { from: accounts[1], value: web3.toBigNumber(100000) })
        const product = await storeContractInstance.getProduct(1, { from: owner })
        const productStock = product[2]
        const storeBalance = await storeContractInstance.balance.call({ from: owner });
        assert.equal(Number(productStock), 9, "Incorrect Product stock number")
        assert.equal(Number(storeBalance), 100000, "Incorrect store balance")
    })


    /**
    * @dev Check if the owner new owner is founded with the store balance after the withdrawal
    */
    it('should withdraw the balance store correctly', async () => {
        //Owner Balance before transaction
        const ownerBalanceBefore = web3.fromWei(web3.eth.getBalance(owner).toNumber())
        const amount = web3.fromWei(await storeContractInstance.balance.call({ from: owner }))
        const transaction = await storeContractInstance.withdraw({ from: owner });

        //Get gasCost
        const gasUsed = web3.eth.getTransactionReceipt(transaction['tx']).gasUsed
        const gasPrice = web3.eth.getTransaction(transaction['tx']).gasPrice
        const gasCost = web3.fromWei((gasUsed * gasPrice))

        const ownerBalanceAfter = web3.fromWei(web3.eth.getBalance(owner).toNumber())

        //fromWei method returns strings, have to append a '+' to add the values
        const expectedBalance = +amount + +ownerBalanceBefore - +gasCost

        assert.equal(expectedBalance, ownerBalanceAfter, 'Amount not withdrawn correctly')
    })
});


