import { atom } from "recoil";


export const balanceAtom = atom({
  key:"userWeb3Info",
  default: "0"
});

export const popupAtom = atom({
  key: "popup",
  default: false
})