pragma solidity ^0.4.2;
import "./Store.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/access/rbac/RBAC.sol";


contract MarketPlace is RBAC, Ownable {
    
    string constant ROLE_STOREOWNER = "storeowner";
    string constant ROLE_OWNER = "owner";
    string constant ROLE_ADMIN = "admin";
   
    // Admin
    mapping(address => bool) public admins;
    address[] public adminsList;
    
    //StorOwners
    address[] public storeOwnersList;
    
   mapping(address => address[]) theStores;
    address[] theStoreList;
    
    
    constructor() public payable {
        require(msg.sender != 0);
        addRole(msg.sender, ROLE_ADMIN);
        // addRole(msg.sender, ROLE_OWNER);
       // addRole(msg.sender, ROLE_ADMIN);
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
    
    
   function getStoresOfStoreOwner(address storeOwnerAddress) view public
    returns (address[]) 
    {
        return theStores[storeOwnerAddress];
    }
    
    function addStore(string storeName) public returns(uint){
        address storecontract = new Store(storeName);
        theStores[msg.sender].push(storecontract);
        return theStoreList.push(storecontract) - 1;
        
    }
    
    function getStoreName(address storeAddress) view public returns(string){
        return Store(storeAddress).getStoreName();
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