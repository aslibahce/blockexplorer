import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

import './App.css';


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [balance, setBalance] = useState();
  const [walletAddress, setWalletAddress] = useState('');
  const [blockNo, setBlockNo] = useState('');
  const [transactionList, setTransactionList] = useState('');
  const [transactionFrom, setTransactionFrom] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    
  });

  async function  walletSearchClicked() {
    if(walletAddress == ""){
      alert("Try to get transaction 'from' value and use to query balance.");
      return;
    }
    var balanceResponse = await alchemy.core.getBalance(walletAddress, "latest");
    var balance = parseFloat(ethers.formatEther(balanceResponse._hex));
    setBalance(balance);
  }

  async function  blockSearchClicked() {
    if(blockNo == "")
    {
      var blockNumber = await alchemy.core.getBlockNumber();
      alert("Last block number: " + blockNumber +" is set! Search to see Transactions.");
      setBlockNo(blockNumber);
      return;
    }
    var blockResponse = await alchemy.core.getBlock(Number(blockNo));
    var transactionList = blockResponse.transactions.join("\r\n");
    setTransactionList(transactionList);
  }

  async function  transactionSearchClicked() {
    if(transactionHash == "")
    {
      alert("Try to search block and get transaction hashes of a block to get detail!");
      return;
    }
    var transactionResponse = await alchemy.core.getTransaction(transactionHash);
    var from = transactionResponse.from;
    setTransactionFrom(from);
  }

  

  return <div className="App">
      <div className="row">
        <div className="column-medium">
          <input type="text"  value={blockNo} placeholder="Block No" onChange={(e) => setBlockNo(e.target.value)}></input>
          <button onClick={blockSearchClicked}>Search</button><br/>
          <span>Transactions: {transactionList} </span>
        </div>
        <div className="column-medium">
          <input type="text"  value={transactionHash} placeholder="Transaction Hash" onChange={(e) => setTransactionHash(e.target.value)}></input>
          <button onClick={transactionSearchClicked}>Search</button><br/>
          <span>From: {transactionFrom}</span>
        </div>
        <div className="column-small">
          <input type="text"  value={walletAddress} placeholder="Wallet Address" onChange={(e) => setWalletAddress(e.target.value)}></input>
          <button onClick={walletSearchClicked}>Search</button><br/>
          <span>Balance: {balance} ETH</span>
        </div>
      </div>
    </div>;
}

export default App;
