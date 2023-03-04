import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { balanceAtom } from "../atom";
import { connectMM } from "../web3/web3";

const Section = styled.div` 
    width: 100%;
    height: 100vh;
    background-color: linear-gradient(135deg, #19000B, #2D0013);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;
const LogoImg = styled.img`
    width: 150px;
    height: 150px;
`;

const Title = styled.h1`
    font-family: "GmarketSansMedium";
    font-weight: bold;
    margin: 10px 0px 50px 0px;
    font-size: 23px;
`;

const BgImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    z-index: -1;
`;
const BoxWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
`;
const EnterBox = styled(motion.div)`
    min-width: 300px;
    min-height: 300px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`;

const BoxImg = styled.img<{imgSize: string}>`
    max-width: ${props => props.imgSize};
`;

const Message = styled(motion.div)`
    color: black;
    font-family: "GmarketSansMedium";
    font-weight: bold;
`;

const hoverVariants = {
    init:{
        scale: 1,
    },
    hover: {
        scale: 1.1,
    }
}

function Start() {
    const { activate } = useWeb3React();
    const setBalance = useSetRecoilState(balanceAtom);
    const history = useHistory();

    const connectWallet = async () => {
        await connectMM(activate, setBalance, history, true);
    }

    return (
        <>
            <Section>
                <BgImg src={require("../img/loginBg.jpg").default} alt="" />
                <LogoImg src={require("../img/logoImg.png").default} alt="" />
                <Title>탈중앙화 Meta View를 시작해 볼까요?</Title>
                <BoxWrap>
                    <Link to={"/home"}>
                        <EnterBox variants={hoverVariants} initial="init" whileHover="hover">
                            <BoxImg imgSize={"100px"} src={require("../img/no-wallet.png").default} />
                            <Message>지갑 없이 보기</Message>
                        </EnterBox>
                    </Link>
                    <EnterBox onClick={connectWallet} variants={hoverVariants} initial="init" whileHover="hover">
                        <BoxImg imgSize={"150px"} src={require("../img/metamask_logo.png").default} />
                        <Message>지갑 연결</Message>
                    </EnterBox>
                </BoxWrap>
            </Section>
        </>
    );
}

export default Start;