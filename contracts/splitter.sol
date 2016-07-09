// This contract receives ether and splits it between two hard-coded addresses. By Chris Dannen

contract Splitter {
		mapping (address => uint) public balances;
		address public alpha;
		address public beta;
		uint public amount;

    	modifier noSelf () { 
    		if(tx.origin == alpha) 
    			throw;
		if(tx.origin == beta) 
			throw; 
 		_
		}

		function Splitter(){
			amount = msg.value;
			alpha = 0x8996e6cac2ae843e42e467b2ebe83e1520d1dc27;
			beta = 0xc07272da006fc380eb4c8aed2285b9bc8e41b358;
		}

	function doSplit() returns (bool sent) {
		alpha.send (amount / 2);
        	beta.send (this.balance);
	}

}

