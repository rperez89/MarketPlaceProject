pragma solidity ^0.4.11;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Store is Ownable, Pausable{
    
    using SafeMath for uint256;

    address public storeOwner;
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
    
    // Events 
    
    event ProductAdded(uint productId);
    event ProductPriceUpdatedSuccessfully(uint productId, uint newPrice);
    event ProductPurchaseSuccessful(uint productId, uint remainingStock);
        
    //Modifier

     /**
    * @dev Throws if called by any account other than owner.
    */
    modifier onlyStoreOwner {
        require(msg.sender == storeOwner);
        _;
    }

    ///Functions
    
    /**
    * @notice Constructor
    * @param _storeOwner Address of the owner of the Store
    * @param _storeName Name of the store
    */
    constructor(address _storeOwner, string _storeName) public {
        storeOwner = _storeOwner;
        storeName = _storeName;
        balance = 0;
        productCount = 0;
    }
    
    function isProductValid(Product product) private pure returns (bool isValid) {
        return (product.price > 0 );
    }     

    function getStoreName() view public returns (string) {
        return storeName;
    }
        
    
    /**
     * @notice Add a new product to the store
     * @param _id Id of the new product
     * @param _name Name of the new product
     * @param _price Price of the new product on WEI
     * @param _stock Initial stock of the new product
     */
    function addNewProduct(uint _id, string _name, uint _price, uint _stock) public onlyStoreOwner whenNotPaused returns (bool success) {
        Product memory newProduct = Product(_id, _name, _price, _stock);
        if (isProductValid(newProduct)) {
            products[_id].product = newProduct;
            products[_id].isEntity = true;
            emit ProductAdded(_id);
            return true;
        }
        return false;
    }
    
    /**
     * @notice Update a product price
     * @param _id Product to be updated 
     * @param _price New Price for the product on WEI
     */
    function updateProductPrice(uint _id, uint _price) public onlyStoreOwner whenNotPaused returns (bool success){
        require(products[_id].isEntity == true);
        products[_id].product.price = _price;
        emit ProductPriceUpdatedSuccessfully(_id,_price);
        return true;
    }
    
    /**
     * @dev Get product by id
     * @param _id Product Id      
     */
    function getProduct(uint _id) public view returns (string name, uint price, uint stock) {
        require(products[_id].isEntity == true);
        return (products[_id].product.name,
                products[_id].product.price,
                products[_id].product.stock);
    }

    /**
     * @notice Buy a product
     * @param _id Product to buy 
     * @param _quantity The number of product items
     */
    function buyProduct(uint _id, uint _quantity) public payable whenNotPaused returns (bool success) {
        uint totalPrice = products[_id].product.price.mul(_quantity);
        if (msg.value >= totalPrice && products[_id].product.stock >= _quantity) {
            balance = balance.add(msg.value);  
            products[_id].product.stock = products[_id].product.stock.sub(_quantity);         
            pendingWithdrawals[owner] = balance;
            emit ProductPurchaseSuccessful(_id, products[_id].product.stock);
            return true;
        }
        return false;
    }
    
    /**
     * @notice Withdraw balance to the store owner
     */
    function withdraw() public onlyStoreOwner {
        uint amount = pendingWithdrawals[owner];
        pendingWithdrawals[owner] = 0;
        balance = 0;
        msg.sender.transfer(amount);
    }
         
 
}