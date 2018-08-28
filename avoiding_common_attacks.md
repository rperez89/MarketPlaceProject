**Logic Bugs** - solidity unit testing shows basic functionality works, enhanced javascript testing will be necessary to fully test and impliment modifiers.

**Poison Data** - Modifiers to limit access.

**Re-entry** - Transfers of funds implementation (Withdrawal pattern) make sure to don't call an external function until done all the internal work needed.

**Poison Data** - Modifiers to limit access.

**Integer Arithmetic Overflow** - Use of SafeMath library to be prepare in case of overflows. Use of uint256 as base type.

**Exposed functions** -  Only one function exposed to shoppers allowing them to pay for a product.

**Gas Limits** - No use of loops in the contracts. 

**Denial of Service** - Only allow the admin to add new owners. Only allow onwers to create new stores.

