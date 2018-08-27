pragma solidity ^0.4.11;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract Store is Ownable, Pausable{
 
    address public owner;
    string public storeName;
    uint256 public balance;
    uint256 public productCount;
    
    
    struct EntityStruct{
        Product product;
        bool isEntity;
    }
    
    struct Product {
        uint id;
        string name;
        uint price;
        uint stock;
    }
    
    mapping(uint => EntityStruct) public products;
    mapping (address => uint) pendingWithdrawals;
    
    /* Events */
    
    event NewProductAdded(uint productId);
    event ProductPriceUpdatedSuccessfully(uint productId, uint newPrice);
    event ProductPurchaseSuccessful(uint productId, uint remainingStock);
    
    
    
    constructor(string _storeName) public {
        storeName = _storeName;
       balance = 0;
       productCount = 0;
    }
    
    function isProductValid(Product product) private pure returns (bool isValid) {
        return (product.price > 0 );
    } 
    
    
    /**
     * @notice Add a new product to the store
     * @param _id Id of the new product
     * @param _name Name of the new product
     * @param _price Price of the new product on WEI
     * @param _stock Initial stock of the new product
     */
    function addNewProduct(uint _id, string _name, uint _price, uint _stock) public onlyOwner whenNotPaused returns (bool success) {
        Product memory newProduct = Product(_id, _name, _price, _stock);
        if (isProductValid(newProduct)) {
            products[_id].product = newProduct;
            products[_id].isEntity = true;
            emit NewProductAdded(_id);
            return true;
        }
        return false;
    }
    
    /**
     * @notice Update a product price
     * @param _id Product to be updated 
     * @param _price New Price for the product on WEI
     */
    function updateProductPrice(uint _id, uint _price) public onlyOwner whenNotPaused returns (bool success){
        require(products[_id].isEntity == true);
        products[_id].product.price = _price;
        emit ProductPriceUpdatedSuccessfully(_id,_price);
        return true;
    }
    
    /**
     * @notice Buy a product
     * @param _id Product to buy 
     * @param _quantity The number of product items
     */
    function buyProduct(uint _id, uint _quantity) public payable whenNotPaused returns (bool success) {
        Product memory product = products[_id].product;
        uint totalPrice = product.price * _quantity;
        if (msg.value >= totalPrice && product.stock >= _quantity) {
            balance += msg.value;
            product.stock -= _quantity;
            pendingWithdrawals[owner] = balance;
            emit ProductPurchaseSuccessful(_id, product.stock);
            return true;
        }
        return false;
    }
    
    /**
     * @notice Withdraw balance to the store owner
     */
    function withdraw() public onlyOwner {
        uint amount = pendingWithdrawals[owner];
        pendingWithdrawals[owner] = 0;
        balance = 0;
        msg.sender.transfer(amount);
    }
    

    function getStoreName() returns (string) {
        return storeName;
    }
    
     function getStoreInfo() view public returns (string, uint256, uint256) {
        return (storeName, balance , productCount);
    }
 
   
 
}