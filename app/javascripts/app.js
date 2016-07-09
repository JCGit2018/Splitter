var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function getAddress(){
  document.getElementById("alpha_address").innerHTML = web3.fromWei(we)
}

function refreshBalance() {
  document.getElementById("contract_balance").innerHTML = web3.fromWei(web3.eth.getBalance(Splitter.deployed_address), "ether").toFixed(5);
  document.getElementById("alpha_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("alpha").innerHTML), "ether").toFixed(5);
  document.getElementById("beta_balance").innerHTML = web3.fromWei(web3.eth.getBalance(document.getElementById("beta").innerHTML), "ether").toFixed(5);
};


function sendCoin() {
  var split = Splitter.deployed();

  var amount = parseInt(document.getElementById("amount").value);

  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: web3.eth.coinbase, to: Splitter.deployed_address, value: amount}, function(error, result) {
    if(error) {
      console.log(error);
      setStatus(error);
    }
    else {
      web3.eth.getTransactionReceiptMined(result).then(function(receipt) {
        setStatus("Transaction complete!");
        refreshBalance();
      }).catch(function(e) {
        console.log(e);
        setStatus(e);
      });
    }
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    setAddress();
    refreshBalance();
  });
}
