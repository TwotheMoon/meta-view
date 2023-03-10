import styled from "styled-components";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRecoilState, useSetRecoilState } from "recoil";
import { balanceAtom, popupAtom } from "../atom";
import { useState } from "react";
import { addTokenToWallet, getNMCToken, isUserGetReward } from "../web3/web3";
import { useWeb3React } from "@web3-react/core";
import CircularProgress from '@mui/material/CircularProgress';

const Section = styled.div`
`;
const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const InfoImg = styled.img`
  width: 340px;
  height: 430px;
`;
const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;
const InfoContentsTapTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
`;
const InfoText = styled.p`
  font-family: "GmarketSansMedium";
  font-weight: bold;
  font-size: 1.2em;
`;


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Popup() {
  const { account } = useWeb3React();
  const setBalance = useSetRecoilState(balanceAtom);
  const [open, setOpen] = useRecoilState(popupAtom);
  const [value, setValue] = useState(0);
  const [pending, setPending] = useState(false);
  const [message, setMesssage] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (<Section>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setMesssage("");
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{border: "1px solid red"}}
        fullScreen
      >
        <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} >
              <Tab label="Goerli ??????" {...a11yProps(0)} sx={{textTransform: "none"}} />
              <Tab label="NMC ?????? ??????" {...a11yProps(1)} />
              <Tab label="?????? ??????" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <ImgWrap>
              <InfoContents>
                <InfoImg src={require("../img/info_01.png").default} alt="" />
                <InfoText>1. ????????? ???????????? ???????????? ????????? ????????? ?????????.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_02.png").default} alt="" />
                <InfoText>2. ?????? {"->"} ???????????? ????????? ?????????.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_03.png").default} alt="" />
                <InfoText>3. ????????? ???????????? ????????? ????????? ????????????.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_04.png").default} alt="" />
                <InfoText>4. ?????? ??????????????? Goerli??? ??????????????????.</InfoText>
              </InfoContents>
            </ImgWrap>
          </TabPanel>
          <TabPanel value={value} index={1}>  
            <InfoContentsTapTwo>
              <InfoText>1. ????????? ?????? ?????? ??????</InfoText>
              <Button onClick={addTokenToWallet} variant="outlined">NMC ?????? ?????? ??????</Button>
            </InfoContentsTapTwo>
            <InfoContentsTapTwo>
              <InfoText>2. 100 NMC ?????? ?????? <br/> <span style={{fontSize: "0.7em"}}>* 1?????? ?????? ??? ????????????.</span></InfoText>
              <Button onClick={ async () => {
                setPending(true);
                await isUserGetReward(account).then( async (res) => {
                  if(res === true){
                    setMesssage("?????? ???????????????! ???????????? ??? ?????? ??? ?????????.");
                    return
                  } else {
                    await getNMCToken(account, setBalance).then(res => {
                      if(res){
                        if(res.status){
                          setMesssage("100NMC??? ??????????????? ????????????!");
                        } 
                      }
                    });
                  }
                }) 
                setPending(false);
                }} variant="outlined">
                 {pending ?
                  <CircularProgress size={25}/>
                 : 
                  "100 NMC ?????? ??????"
                 }
                </Button>
                {message && <span>{message}</span>}
            </InfoContentsTapTwo>
            <InfoContents style={{gap:10, marginTop: 40}}>
                <InfoText>if ???????????? ????????? ???????????? ?????????ETH??? ???????????????!</InfoText>
                <InfoImg style={{width: 700, height:"initial"}} src={require("../img/info_05.png").default} alt="" />
                <a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer">https://goerlifaucet.com/</a>
              </InfoContents>

          </TabPanel>
          <TabPanel value={value} index={2}>
             <InfoContents style={{gap:10, marginTop: 40}}>
                <InfoText>?????? ????????? ????????? ??????????</InfoText>
                <InfoImg style={{width: 700, height:"initial"}} src={require("../img/info_06.png").default} alt="" />
              </InfoContents>
          </TabPanel>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
            setMesssage("");
            }} >??????</Button>
        </DialogActions>
      </Dialog>
  </Section>)
}

export default Popup;