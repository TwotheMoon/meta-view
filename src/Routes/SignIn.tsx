import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import kakoLogo from "../img/kakaoLogo.svg";
import faceBookLogo from "../img/faceBookLogo.svg";
import googleLogo from "../img/googleLogo.svg";
import tweeterLogo from "../img/tweeterLogo.svg";
import appleLogo from "../img/appleLogo.svg";
import lineLogo from "../img/lineLogo.svg";
import { Link } from "react-router-dom";

const Banner = styled.div < { bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
    `;

const SignInWrap = styled.div`
    width: 300px;
    height: 300px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4{
        font-family: "GmarketSansMedium";
        font-weight: bold;
    }
    span{
        font-family: "GmarketSansLight";
        font-weight: bold;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        &:hover{
            text-decoration: underline;
        }
        cursor: pointer;
    }
`;

const InputWrap = styled.div`
    margin-top: 15px;
    input::placeholder{
        font-family: GmarketSansLight;
        font-weight: bold;
    }
    input:focus{
        outline: none;
    }
    input:first-child{
        width: 100%;
        height: 45px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-left: 10px;
    }
    input:last-child{
        width: 100%;
        height: 45px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border: none;
        padding-left: 10px
    }
`;


const SignInBtn = styled.button`
    width: 100%;
    height: 50px;
    margin-top: 15px;
    background-color: rgba(255, 4, 88, 0.5);
    border: none;
    border-radius: 40px;
    color: white;
    font-family: "GmarketSansMedium";
    font-weight: bold;
    cursor: pointer;
    `;

const AnotherSignIn = styled.div`
        margin-top: 15px;
        font-family: "GmarketSansLight";
        font-weight: bold;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        padding-top: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    `;

const SnsLogoWrap = styled.ul`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    img{
        cursor: pointer;
    }
`;
function SignIn() {
    const { data } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    return (
        <>
            <Banner bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")} >
                <SignInWrap>
                    <TitleWrap>
                        <h4>로그인</h4>
                        <span>비밀번호를 잊어버리셨나요?</span>
                    </TitleWrap>
                    <InputWrap>
                        <input placeholder="이메일 (example@gmail.com)"></input>
                        <input placeholder="비밀번호"></input>
                    </InputWrap>
                    <Link to="/home">
                        <SignInBtn>로그인</SignInBtn>
                    </Link>
                    <AnotherSignIn> 다른 방법으로 로그인하기 </AnotherSignIn>
                    <SnsLogoWrap>
                        <img alt="kako" src={kakoLogo} />
                        <img alt="faceBook" src={faceBookLogo} />
                        <img alt="google" src={googleLogo} />
                        <img alt="tweeter" src={tweeterLogo} />
                        <img alt="apple" src={appleLogo} />
                        <img alt="line" src={lineLogo} />
                    </SnsLogoWrap>
                </SignInWrap>
            </Banner>
        </>
    );
}

export default SignIn;