pragma solidity ^0.4.2;
import "./Store.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/access/rbac/RBAC.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/**
 * @title MarketPlace
 * @dev Marketplace and store factory
 */

contract MarketPlace is RBAC, Ownable, Pausable {
    
    string constant ROLE_STOREOWNER = "storeowner";    
    string constant ROLE_ADMIN = "admin";
   
    // Admin
    mapping(address => bool) public admins;
    address[] public adminsList;
    
    //StorOwners
    address[] public storeOwnersList;
    
    mapping(address => address[]) stores;
    address[] storeList;
    
    /**
    * @dev Constructor
    */
    constructor() public {
        require(msg.sender != 0);
        addRole(msg.sender, ROLE_ADMIN);
        
    }

    /**
    * @notice Function check if an account has a role
    * @param _address The address to be checked
    * @param _role The role to be checked
    */
    function accountHasRole (address _address, string _role) view public returns (bool) {
        return hasRole(_address,_role);
    }
    
    /**
    * @notice Add store owner, only admin can do that
    * @param _storeOwnerAddress The address to be checked    
    */
    function addStoreOwner(address _storeOwnerAddress) public onlyRole(ROLE_ADMIN) returns(bool success) {
        require(_storeOwnerAddress != 0);
        require(!hasRole(_storeOwnerAddress,ROLE_STOREOWNER));
        addRole(_storeOwnerAddress, ROLE_STOREOWNER);
        storeOwnersList.push(_storeOwnerAddress) - 1;
        return true;
    }    
    
    /**
    * @notice Get the stores of a storeowner
    * @param _storeOwnerAddress The address to be checked    
    */
   function getStoresOfStoreOwner(address _storeOwnerAddress)  public onlyRole(ROLE_STOREOWNER) returns (address[]) 
    {
        require(msg.sender == _storeOwnerAddress);
        return stores[_storeOwnerAddress];
    }
    
    /**
    * @notice Add Store, only a store owner can add a store
    * @param _storeName The name of the store   
    */
    function addStore(string _storeName) public onlyRole(ROLE_STOREOWNER) returns(bool success){
        require(hasRole(msg.sender,ROLE_STOREOWNER));        
        address storecontract = new Store(msg.sender,_storeName);
        stores[msg.sender].push(storecontract);
        storeList.push(storecontract) - 1;
        return true;
    }
    
    /**
    * @notice Get Store name by store address
    * @param _storeAddress The name of the store   
    */
    function getStoreName(address _storeAddress) view public returns(string){
        return Store(_storeAddress).getStoreName();
    }

     /**
    * @notice Get All the stores     
    */
    function getAllStores() view public returns (address[]){
        return storeList;
    }
    
          
}