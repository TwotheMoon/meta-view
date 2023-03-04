import { MetaMaskInpageProvider } from "@metamask/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { History } from "history";
import { SetterOrUpdater } from "recoil";
import Web3 from "web3";
import abi from "./abi.json"

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | any;
  }
}


export const web3 = new Web3(window.ethereum);
const injected = new InjectedConnector({supportedChainIds: [1, 5]});
const CA = "0xc400CAbC54890D060CEb3f080F54c6b79D748a46";

let NMCabi = JSON.parse(JSON.stringify(abi));

export const NMCContract = new web3.eth.Contract(
  NMCabi,
  CA
);


export const connectMM = async (activate: { (connector: AbstractConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean | undefined): Promise<void>; (connector: AbstractConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean | undefined): Promise<void>; (arg0: InjectedConnector): any; }, setBalance: SetterOrUpdater<string>, history: History<unknown>, isStart?:boolean) => {
  
  try {
    await activate(injected, (error) => {
      if('/No Ethereum provider was found on window.ethereum/')
      throw new Error('Metamask 익스텐션을 설치해주세요');
    });
    
    if(isStart){
      history.push("/home");
    }
  } catch (error) {
    console.log(error)
  }
}    

export const switchNetworkToWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params:[{ chainId: "0x5" }]
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getBalance = async (account: string, setBalance: SetterOrUpdater<string>) => {
  try {
    await NMCContract.methods.balanceOf(account).call().then((token: string) => {
      setBalance(web3.utils.fromWei(token, 'ether'))
    })
  } catch (error) {
    
  }
}

export function shortAddress(account:string | undefined | null) {
  const result = `${account?.slice(0, 4)}...${account?.slice(account?.length - 4)}`;
  return result;
};

// ETH -> Wei 변환
export const EthToWei = (amount:string) => {
  return web3.utils.toWei(amount, "ether");
};

// Wei -> ETH 변환
export const WeiToEth = (amount:string) => {
  return web3.utils.fromWei(amount, "ether");
};

export const handleNetworkChanged = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params:[{ chainId: "0x5" }]
      });
    } catch (error) {
      console.log(error);
    }
  }
}
