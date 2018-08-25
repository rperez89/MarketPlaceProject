pragma solidity ^0.4.11;
 
contract Store {
 
    address owner;
    string name;
    address factory;
    uint count = 0;
    uint balance;

    struct Item{
        string name;
        uint price;
        uint quantity;
    }
   
    constructor(string _name) {
        
        owner = msg.sender;
        name = _name;
    }
 
    function getStoreName() view public  returns (string) {
        return name;
    }
    
 
 
}
 