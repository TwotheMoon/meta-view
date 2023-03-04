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
              <Tab label="Goerli 연결" {...a11yProps(0)} sx={{textTransform: "none"}} />
              <Tab label="NMC 토큰 받기" {...a11yProps(1)} />
              <Tab label="영화 구매" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} >
            <ImgWrap>
              <InfoContents>
                <InfoImg src={require("../img/info_01.png").default} alt="" />
                <InfoText>1. 프로필 이미지를 클릭해서 설정에 들어가 주세요.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_02.png").default} alt="" />
                <InfoText>2. 설정 {"->"} 고급탭에 들어가 주세요.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_03.png").default} alt="" />
                <InfoText>3. 테스트 네트워크 보기를 활성화 해주세요.</InfoText>
              </InfoContents>
              <InfoContents>
                <InfoImg src={require("../img/info_04.png").default} alt="" />
                <InfoText>4. 이제 네트워크를 Goerli로 변경해주세요.</InfoText>
              </InfoContents>
            </ImgWrap>
          </TabPanel>
          <TabPanel value={value} index={1}>  
            <InfoContentsTapTwo>
              <InfoText>1. 지갑에 토큰 정보 추가</InfoText>
              <Button onClick={addTokenToWallet} variant="outlined">NMC 토큰 정보 추가</Button>
            </InfoContentsTapTwo>
            <InfoContentsTapTwo>
              <InfoText>2. 100 NMC 토큰 받기 <br/> <span style={{fontSize: "0.7em"}}>* 1번만 받을 수 있습니다.</span></InfoText>
              <Button onClick={ async () => {
                setPending(true);
                await isUserGetReward(account).then( async (res) => {
                  if(res === true){
                    setMesssage("이미 받으셨군요! 아쉽지만 더 드릴 수 없어요.");
                    return
                  } else {
                    await getNMCToken(account, setBalance).then(res => {
                      if(res){
                        if(res.status){
                          setMesssage("100NMC을 성공적으로 받았어요!");
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
                  "100 NMC 토큰 받기"
                 }
                </Button>
                {message && <span>{message}</span>}
            </InfoContentsTapTwo>
            <InfoContents style={{gap:10, marginTop: 40}}>
                <InfoText>if 가스비가 없다면 포셋에서 무료로 받아보세요!</InfoText>
                <InfoImg style={{width: 700, height:"initial"}} src={require("../img/info_05.png").default} alt="" />
                <a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer">https://goerlifaucet.com/</a>
              </InfoContents>

          </TabPanel>
          <TabPanel value={value} index={2}>
             <InfoContents style={{gap:10, marginTop: 40}}>
                <InfoText>이제 영화를 구입해 볼까요?</InfoText>
                <InfoImg style={{width: 700, height:"initial"}} src={require("../img/info_06.png").default} alt="" />
              </InfoContents>
          </TabPanel>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
            setMesssage("");
            }} >확인</Button>
        </DialogActions>
      </Dialog>
  </Section>)
}

export default Popup;