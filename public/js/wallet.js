// public/js/wallet.js
// Connects the user's MetaMask wallet when the "Connect Wallet" button is clicked.

let userAddress = null;
const connect = document.getElementById("wallet-connect");

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask isn't detected. Please install the MetaMask extension and refresh.");
    return;
  }

  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((data) => {
      userAddress = data[0];
      let walletString =
        userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
      connect.innerHTML = walletString;
      return userAddress;
    })
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect a wallet.");
      } else {
        console.error(err);
      }
    });
}

if (connect) {
  connect.addEventListener("click", connectWallet);
}