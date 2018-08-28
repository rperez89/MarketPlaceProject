One of the most important design patterns I used in this project is using audited libraries where appropriate 
Ownable, Pausable, SafeMath, RBAC. All of these come from the Zeppelin library which allowed me to have a lot of the logic I needed without having to worry about security concerns of writing it from scratch.

* Guard Check : I ensure that the behavior of a smart contract and its input parameters are as expected( require() for input        parameters).

* Access Restriction : The access to the contract functions were restricted depending on the user role, for that i used  RBAC       from Zeppeling library.

* Emergency Stop: With the help of this pattern, i have possibility to pause a contract by blocking calls of critical functions,    preventing attackers from continuing their work. Of course, this pattern can be used to prevent the exploit of any kind of      bug, regardless if it was discovered by an attacker or a benign entity, until the smart contract is fixed, or other             countermeasures  have been taken. Implemented using Pausable from Zeppelin.

* OpenZeppelins-solidity Ownable was implimented 

* OpenZeppelins-solidity SafeMath library implemented as a base type for uint256 to cover from overflow.

* Decide not to use Mortal design pattern cause my app will only live on private chain on this iteration.

* Use of the patter Fail early and fail loud to check conditions as early as possible.

