pragma solidity ^0.4.11;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Store is Ownable{
 
    bytes32 public storeName;
    uint256 public balance;
    uint256 public productCount;
    
    struct Product {
        uint id;
        bytes32 name;
        uint price;
        uint stock;
    }
    
    mapping(uint => Product) public products;
    
    
    event NewProductAdded(uint productId);
    
    constructor(bytes32 _storeName) public {
        storeName = _storeName;
    }
    
    function isProductValid(Product product) private pure returns (bool isValid) {
        return (product.price > 0 );
    } 
    
    
    function addNewProduct(uint id, bytes32 name, uint price, uint stock) public onlyOwner returns (bool success) {
        Product memory newProduct = Product(id, name, price, stock);
        if (isProductValid(newProduct)) {
            products[id] = newProduct;
            emit NewProductAdded(id);
            return true;
        }
        return false;
    }
    
    /*function removeProduct(uint id, uint quantity) public onlyOwner returns (bool success){
        Product memory product = products[id];
        if (product.id == id) {
            uint actualStock = products[id].stock;
            products[id].stock = actualStock - quantity;
            //emit ProductRemoved(id, products[id].stock);
            return true;
        }
        return false;
    }*/
    
 
    function getStoreName() view public returns (bytes32) {
        return storeName;
    }
    
    
   
 
}
 