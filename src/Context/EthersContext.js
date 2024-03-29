import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { usdtAbi } from "../Utils/USDtabi";
import { English } from "../Comonents/Languages/English";
import { Chinese } from "../Comonents/Languages/Chinese";
export const EthersContext = createContext(null);
const {ethereum} = window
export default function Ethers({children}){
  const [Lang, setLang] = useState(true)
  const [Language, setLanguage] = useState(English)
  const contractAddress = "0x0636FE4e3710d9340e2f20137967f187211EB8F3"
   const usdtContractAddress  =  "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
  //const usdtContractAddress  =   "0x0dfFAF868a89f32538bC2B582A859326c5CB5D93"
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]); 
          return 1;
        } else {
          alert("No accounts found");
          return 0;
        }
      } catch (error) {
        console.log(error);
        return 0;
      }
    };

    const connectWallet = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");   
      }
    };

  
  
      const checkOwner = async()=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const accounts = await ethereum.request({method:"eth_accounts"})
        const account  = accounts[0]
         const contract = new ethers.Contract(contractAddress, abi,signer)

         const ownerAddress = await contract.owner()
         let x= false;
         if(account.toUpperCase()===ownerAddress.toUpperCase()) x=true
         return x
      }

      const checkSignIn = async()=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi,signer)
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const s1 = await contract.active(account)
         const s2 =  parseInt(s1, 16)
         return s2;
      }

      const withdrawUsdt = async()=>{
        try{
          console.log("withdraw-2")
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
           const s1 = await contract.withdrawBalanceUsdt("0x41839BC0DBA60f0a06deCdab2a655b1DB339C76C")
           s1.wait()

        }catch(e){
          console.log(e)
        }
       
      }


      const signIn= async(address, active)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const transfer = await contract.signIn(address, active)
          await transfer.wait()
          alert("Sign In succeful, if your are not redirected , refresh after few minutes")
        }catch(e){
          if(e.data.message=="execution reverted: To get referal balance the referrer must have bought atleast one unit"){
            alert("SignIn reverted, The referrer must buy atleast one Unit to refer")
          }else{
            alert(e.data.message)
          }
      console.log(e)
        }
      }

      const getUsdtBalance= async(address, active)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
          const balance = await contract.getUsdtBalance()
          return balance
        }catch(e){
          console.log(e)
        }
      }
      const getReferanceProfit= async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.referenceProfit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)

        }
      }

      const withdrawBalanceUsdt = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(usdtContractAddress, usdtAbi ,signer)
          const balance = await contract.withdrawBalanceUsdt()
          balance.wait()
          console.log("transaction succeful")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const unitBalance = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          // let balance = await contract.unitBalance(account)
          // let s2 =  parseInt(balance._hex, 16)
         
          let balance1 = await contract.unitCount(account)
          let s21 =  parseInt(balance1._hex, 16)
          let arr = [s21];
          const benifit = await contract.benifit(account)
          const s22 =  parseInt(benifit._hex, 16)
          arr.push(s22)
          
          const balance3 = await contract.referenceProfit(account)
          const s23 =  parseInt(balance3._hex, 16)
          arr.push(s23)
          const balance4 = await contract.IN(account)
          const s24 =  parseInt(balance4._hex, 16)
          arr.push(s24)
          // console.log(arr)
          // arr.push(s24)
        return arr
        }catch(e){
          console.log(e)
        }
      }
      const rBenifit = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.benifit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const unitCount = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.unitCount(account)
          const s2 =  parseInt(balance._hex, 16)
          //console.log("unitcounr",s2)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const limitCount = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()  
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const balance = await contract.unitLimit()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const getTotalSupply = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()  
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const balance = await contract.totalSupply()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }



      const sendUSDTtoContract= async(amnt)=>{
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(usdtContractAddress ,usdtAbi ,signer)
        let _amount = parseInt(amnt)
        _amount = _amount * 10000000
        let amount  = ethers.utils.hexlify(_amount)

        //console.log(amount, "sendusdt")
        const transfer = await contract.transfer(contractAddress,amount)
        await transfer.wait()
        return true
      }

      const buyToken= async(x)=>{
        const transaction = await sendUSDTtoContract(x)
          let y = parseInt(x)
          let amount  = ethers.utils.hexlify(y)
          //console.log(amount, "before")
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress ,abi,signer)
          console.log("Sending.....")
          const transfer = await contract.buyUnitToken(amount)
          await transfer.wait()
          console.log("transferred")
      }
     


      
      const enterGame= async()=>{
        
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          const gameEntry = await contract.enterGame()
          await gameEntry.wait()

      }
      const changeOwner= async(address)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          await contract.changeOwner(address)
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const changeLimit= async(limit)=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi,signer)
          const chlmt = await contract.changeLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      // const changeNetwork = async () => {
      //   if (window.ethereum) {
      //     try {
      //       await window.ethereum.request({
      //       method: 'wallet_switchEthereumChain',
      //         params: [{ chainId: "0x89" }],
      //       });
      //     } catch (error) {
      //       console.error(error);  myRefferals
      //     }
      //   }}
      const referanceData = async()=>{
        try{
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          
          const contract = new ethers.Contract(contractAddress ,abi ,signer)
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          
          const referals = await contract.myRefferals(account)
          //console.log(referals)
          let arr=[];
          for(let i=0; i<9;i++){
            const s1 = await referals[i]._hex
            const s2 =  parseInt(s1, 16)
            arr.push(s2)
          }
          return arr
        }catch(e){
          console.log(e)
        }
      }
      

      const getN = async()=>{
        const chainId = 137 // Polygon Mainnet

        if (window.ethereum.networkVersion !== chainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: "0x89" }]
                });
              } catch (err) {
                  // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: 'Polygon Mainnet',
                        chainId: "0x89" ,
                        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                        rpcUrls: ['https://polygon-rpc.com/']
                      }
                    ]
                  });
                }
              }
            }
        
      }

    useEffect(() => {
      checkIfWalletIsConnect();
      // changeNetwork()
      getN()
      
    }, []);

    useEffect(() => {
      if(Lang==true) setLanguage(English)
      else setLanguage(Chinese)
    }, [Lang])
    


    return(
        <EthersContext.Provider value={{connectWallet,unitCount,referanceData,getReferanceProfit, currentAccount,changeLimit,limitCount, checkIfWalletIsConnect , checkOwner,checkSignIn, signIn,getUsdtBalance,unitBalance, sendUSDTtoContract,buyToken,enterGame,changeOwner,rBenifit,withdrawUsdt,Lang, setLang, Language,getTotalSupply,withdrawBalanceUsdt}}>
          {children}
        </EthersContext.Provider>
    )
}


// chnageOwner(address _newOwner)
// signIn(address _friend,bool _active) 
// enterGame(uint256 x)
// buyUnitToken()
// getUsdtBalance()
// withdrawBalanceUsdt()
// unitBalance(address)
// usdtBalance(address)
// active(address)
// 