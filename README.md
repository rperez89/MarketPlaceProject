# MarketPlaceProject

Create an online marketplace that operates on the blockchain.

There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.

The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using cryptocurrency.

What it does
Satisfies the following:

Identification.
Market Place functionality for admins, owners y shoppers.
Allow admins to add new owners.
Allow owners to create stores and manage products.
Allow shoppers to view stores and buy products.

Contracts on the project:
MarketPlace.sol - Provide Market Place funcionality.
Store.sol - Store functionality.

Getting Started
These prerequisites and repository files should allow a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node package manager - https://www.npmjs.com/get-npm
npm should be installed properly on your machine. See the above link for how to do this.

Truffle install - https://github.com/trufflesuite/truffle
Truffle should be installed properly on your machine. See the above link for how to do this.

ganache-cli install - https://github.com/trufflesuite/ganache-cli
Ganache-cli should be installed properly on your machine. See the above link for how to do this. The GUI Ganache can also be used.

Project files (this git collection) in a local directory.
Unzip/Clone the Repository to a local directory

MetaMask install - https://metamask.io/
Install MetaMask. See above link for how to do this.

Installing
Copy files to marketplace Directory

git clone https://github.com/rperez89/MarketPlaceProject.git

Installing dependecies
npm install

run ganache-cli with following mnemonic "boost milk infant property undo gravity amazing clog spot hotel spoon cancel"

ganache-cli --port 8545 --mnemonic "boost milk infant property undo gravity amazing clog spot hotel spoon cancel"
Set Up MetaMask for project - import with seed phrase "boost milk infant property undo gravity amazing clog spot hotel spoon cancel"

change the network to Private Network, set port to: 8545
This will set account[0].
Compile truffle Compile the project from the directory where the files are located.

truffle compile
Migrate Migrate the project to the blockchain.
truffle migrate
Tests A series of javascript tests for the contract files, testing basic contract functionality.
truffle test
Run Development Web Server for project. Run the following command in the directory where you compiled the package from.
npm run start

Built With
Truffle Suite - Truffle Suite Framework.
ganache-cli - Ganache-cli (command line)
truffle react box - Web app base.
OpenZeppelin-Solidity (Pausable.sol, SafeMath.sol, Owneable  )

Author
Rodrigo Perez