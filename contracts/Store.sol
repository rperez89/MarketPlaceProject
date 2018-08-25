pragma solidity ^0.4.11;
 
contract Store {
 
    address owner;
    bytes32 name;
    address factory;
    uint count = 0;
    uint balance;

    struct Item{
        string name;
        uint price;
        uint quantity;
    }

   
    constructor(bytes32 _name) {
        
        owner = msg.sender;
        name = _name;
    }
 
    function getStoreName() view public returns (bytes32) {
        return name;
    }
    
 
 
}
 