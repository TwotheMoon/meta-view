import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from 'react-player'

const Section = styled.div` 
    width: 100%;
    height: 100vh;
    background-color: linear-gradient(135deg, #19000B, #2D0013);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

`;
const LogoImg = styled.img`
    width: 200px;
    height: 191px;
    margin-left: 50px;
`;

const Title = styled.h1`
font-family: "GmarketSansMedium";
    font-weight: bold;
    margin-top: 10px;
    font-size: 23px;
    margin-left: 50px;
`;

const Description = styled.p`
    margin-top: 20px;
    font-family: "GmarketSansLight";
    font-weight: bold;
    margin-left: 50px;
`;

const Button = styled.button`
    border: none;
    width: 170px;
    height: 50px;
    background-color: rgba(183, 31, 108, 0.5);
    border-radius: 50px;
    margin-top: 20px;
    font-family: "GmarketSansMedium";
    font-weight: bold;
    font-size: 15px;
    color: white; 
    margin-left: 50px;
    position: relative;
    z-index: 99;
    cursor: pointer;
    transition: 1s;
    &:hover{
        background-color: rgba(183, 31, 108, 1);
    }
`;

const BgVideo = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
`;

function Start() {

    return (
        <>
            <Section>
                <BgVideo>
                    <ReactPlayer
                        className='react-player'
                        url={[
                            'https://www.youtube.com/watch?v=AAnkc01ITpw',
                            'https://www.youtube.com/watch?v=NtkbmqOqY0c',
                        ]}
                        width='100%'
                        height='100%'
                        playing={true}
                        muted={true}
                        controls={false}
                        light={false}
                        style={{ zIndex: -1, position: "relative", opacity: 0.5 }}
                    />
                </BgVideo>
                <LogoImg src={`${process.env.PUBLIC_URL}/asset/monviewLogoVer1.png`} />
                <Title>영화,드라마,예능,다큐멘터리를 무제한으로!</Title>
                <Description>
                    액션 영화와 TV를 좋아하시나요? MonView가 여러분을 위해 준비했습니다! <br />
                    사용하는 모든 기기에서 영화 및 TV 프로그램을 스트리밍하세요! <br />
                    합리적인 가격으로 가족, 친구들과 함께 즐겨요!<br />
                </Description>
                <Link to='/home'>
                    <Button>2주 무료 이용 시작</Button>
                </Link>
            </Section>
        </>
    );
}

export default Start;