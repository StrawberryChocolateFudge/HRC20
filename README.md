# HRC20 Contract with Simple Terms

This is a token contract works with Ricardian Fabric and implements the HRC20 standard from Harmony which is compatible with ERC20. the code is pretty much taken from the https://ide.harmony.one template with added support for Ricardian Fabric using inheritance and checkAcceptance modifier.


## Events
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed _owner,address indexed _spender,uint256 _value);

    event Burn(address indexed from, uint256 value);

## Constructor

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 initialSupply,
        uint8 _decimals
    )

Note: The total supply is created from the initial supply like 
    
    totalSupply = initialSupply * 10**uint256(decimals);

This means you don't need to pass the value in like ethers.utils.parseEther("100.0"), because the big number is handled in contract.

## Functions

    function transfer(address _to, uint256 _value)
           public
           checkAcceptance
           returns (bool success);

Sends _value to the address _to only if the sender has accepted the terms and returns true if the function succeeds.

    function transferFrom(
            address _from,
            address _to,
            uint256 _value
        ) public checkAcceptance returns (bool success)

Using the allowances, sends tokens on the behalf of _from to address _to, the amount transfered is _value
Only works if the terms has been acceted.

    function approve(
        address _spender,
        uint256 _value) public checkAcceptance returns (bool success)

Allows _spender to spend no more than _value on behalf of msg.sender only if the sender has accepted the terms.

