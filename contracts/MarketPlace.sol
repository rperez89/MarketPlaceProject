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
    string constant ROLE_OWNER = "owner";
    string constant ROLE_ADMIN = "admin";
   
    // Admin
    mapping(address => bool) public admins;
    address[] public adminsList;
    
    //StorOwners
    address[] public storeOwnersList;
    
    mapping(address => address[]) stores;
    address[] storeList;
    
    
    constructor() public {
        require(msg.sender != 0);
        addRole(msg.sender, ROLE_ADMIN);
        
    }    
    
    function accountHasRole (address _address, string role) view public returns (bool) {
        return hasRole(_address,role);
    }
    
    function addStoreOwner(address storeOwnerAddress) public onlyRole(ROLE_ADMIN) returns(bool success) {
        require(storeOwnerAddress != 0);
        require(!hasRole(storeOwnerAddress,ROLE_STOREOWNER));
        addRole(storeOwnerAddress, ROLE_STOREOWNER);
        storeOwnersList.push(storeOwnerAddress) - 1;
        return true;
    }    
    
   function getStoresOfStoreOwner(address storeOwnerAddress)  public onlyRole(ROLE_STOREOWNER)
    returns (address[]) 
    {
        require(msg.sender == storeOwnerAddress);
        return stores[storeOwnerAddress];
    }
    
    function addStore(string storeName) public onlyRole(ROLE_STOREOWNER) returns(bool success){
        require(hasRole(msg.sender,ROLE_STOREOWNER));
        //require(storeName.length != 0, "Store name can not be empty");
        address storecontract = new Store(storeName);
        stores[msg.sender].push(storecontract);
        storeList.push(storecontract) - 1;
        return true;
    }
    
    function getStoreName(address storeAddress) view public returns(string){
        return Store(storeAddress).getStoreName();
    }

    function getAllStores() view public returns (address[]){
        return storeList;
    }
    
        /*
    *  Admin Functions
    */
    
    /*function addAdmin(address adminAddress) public onlyAdmin {
        require(adminAddress != 0);
        require(!hasRole(adminAddress,ROLE_ADMIN));
        admins[adminAddress].isEntity = true;
        admins[adminAddress].listPointer = adminsList.push(adminAddress) - 1;
       // addRole(adminAddress, ROLE_ADMIN);
    }
    
    function getAdmins()  
    public onlyAdmin 
    returns (address[]) 
    {
        return adminsList;
    }
    
    
    
    function getStoreOwners()  
    public onlyAdmin 
    returns (address[]) 
    {
        return storeOwnersList;
    }
     */
    
}