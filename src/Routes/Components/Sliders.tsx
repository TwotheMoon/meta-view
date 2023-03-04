import { motion, useViewportScroll, AnimatePresence } from "framer-motion";
import { useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getSimilarMovies, getVideo, IGetMoviesResult, IMovie } from "../../api";
import { makeImagePath } from "../../utils";
import { useWeb3React } from "@web3-react/core";
import { connectMM, switchNetworkToWallet } from "../../web3/web3";
import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../../atom";

const Slider = styled(motion.div)`
    margin-top: 80px;
    width: 100%;
    position: relative;
    top: -100px;
    display: grid;
    h1{
        position: absolute;
        top: -40px;
        left: 20px;
        font-weight: bold;
        font-size: 20px;
    }
`;
const SliderBtn = styled.button`
    width: 40px;
    height: 200px;
    z-index: 99;
    background-color: rgba(255,255,255,0.4);
    border: none;
    cursor: pointer;
    &:last-child{
        position: absolute;
        right: 0;
    }
`;
const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 5px;
    position: absolute;
    width: 100%;
    padding: 0px 50px;
`;
const Box = styled(motion.div) <{ bgPhoto: string }>`
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 68px;
    &:first-child{
        transform-origin: center left;   /*{첫번째 box만 애니메이션 중심 왼쪽 중앙}*/
    }
    &:last-child{
        transform-origin: center right; /*{마지막 box만 애니메이션 중심 왼쪽 중앙}*/
    }
    cursor: pointer;
`;
const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align: center;
        font-size: 18px;
    }
`;
const rowVariants = {
    hidden: (back: boolean) => ({
        x: back ? -window.innerWidth - 5 : window.innerWidth + 5,
    }),
    visible: {
        x: 0,
    },
    exiting: (back: boolean) => ({
        x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
    }),
};
const BoxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.3,
            duration: 0.1,
            type: "tween",
        }
    }
};
const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.1,
            type: "tween",
        }
    }
}
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;
const BigMovie = styled(motion.div)`
    position: absolute;
    z-index: 99;
    width: 40vw;
    height: 100vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props) => props.theme.black.lighter};
    `;
const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;
const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 10px;
    padding-left: 20px;
    font-size: 30px;
    `;
const IconWrap = styled.div`
    padding-top: 10px;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    `;
const Icons = styled.div`
    width: 100%;
    display: flex;
    
`;
const IconCircle = styled(motion.div)`
    margin-left: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.7);
    }
    `;
const BigInfo = styled.span`
    width: 100%;
    margin-right: 30px;
    padding-top: 10px;
    padding-left: 120px;
    font-family: "GmarketSansLight";
    font-weight: bold;
    font-size: 13px;
    span{
        font-family: "GmarketSansMedium";
        font-weight: bold;
    }
`;
const BigOverview = styled.p`
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
`;
const SimWrap = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
`;
const SimInfo = styled.span`
    font-family: "GmarketSansMedium";
    font-weight: bold;
    padding-left: 10px;
`;
const SimCover = styled.div`
    width: 100%;
    height: 250px;
    margin: 0px 10px;
    background-size: cover;
    background-position: center center;
    position: relative;
`;
const SimTitle = styled.div`
    font-family: "GmarketSansLight";
    font-weight: bold;
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
`;
const BuyBtn = styled.div`
    width: 90%;
    font-size: 15px;
    font-family: "GmarketSansLight";
    font-weight: bold;
    background-color: black;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    margin: 10px auto;

    transition-duration: 0.3s;
    &:hover{
        background-color: orange;
        color: black;
    }
`;

const offset = 6;
let selectMovieId = 0;
function Sliders({ data, title, sliderNum, clickSlider }: any) {
    const {active, chainId, activate} = useWeb3React();
    const setBalance = useSetRecoilState(balanceAtom);
    const { scrollY } = useViewportScroll();
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const { data: simData } = useQuery<IGetMoviesResult>(["simMovies", selectMovieId], () => getSimilarMovies(selectMovieId));
    const { data: videoData } = useQuery<IGetMoviesResult>(["videos", selectMovieId], () => getVideo(selectMovieId));
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [back, setBack] = useState(false);

    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            setBack(false);
            toggleLeaving();
            const totalMovies = data?.results.length - 1; 
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    };
    const decreaseIndex = () => {
        if (data) {
            if (leaving) return;
            setBack(true);
            toggleLeaving();
            const totalMovies = data?.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => prev === 0 ? maxIndex : prev - 1);
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        history.push(`/movies/${movieId}`);
        selectMovieId = movieId;
    };
    const onOverlayClick = () => history.push("/home");
    const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find((movie: IMovie) => String(movie.id) === bigMovieMatch.params.movieId);
    
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.playVideo();
    }
    
    const opts: YouTubeProps['opts'] = {
        height: "390",
        width: "100%",
        playerVars: {
        autoplay: 1,
        },
    };

    return (
        <>
            <Slider>
                <h1>{title}</h1>
                <AnimatePresence custom={back} initial={false} onExitComplete={toggleLeaving}>
                    <SliderBtn onClick={decreaseIndex}><i className="fas fa-chevron-left fa-2x"></i></SliderBtn>
                    <Row
                        variants={rowVariants}
                        custom={back}
                        initial="hidden"
                        animate="visible"
                        exit="exiting"
                        transition={{ type: "tween", duration: 1 }}
                        key={index}
                    >
                        {data?.results.slice(1)
                            .slice(offset * index, offset * index + offset)
                            .map((movie: IMovie) => (
                                <Box
                                    layoutId={movie.id + "" + sliderNum}
                                    key={movie.id + sliderNum}
                                    whileHover="hover"
                                    initial="normal"
                                    variants={BoxVariants}
                                    onClick={() => onBoxClicked(movie.id)}
                                    transition={{ type: "tween" }}
                                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                ><Info variants={infoVariants} >
                                        <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                            ))}
                    </Row>
                </AnimatePresence>
                <SliderBtn onClick={increaseIndex}><i className="fas fa-chevron-right fa-2x"></i></SliderBtn>
            </Slider>
            <AnimatePresence>
                {bigMovieMatch && sliderNum === clickSlider ?
                    <>
                        <Overlay
                            onClick={onOverlayClick}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <BigMovie
                            style={{ top: scrollY.get() + 100, }}
                            layoutId={bigMovieMatch.params.movieId + sliderNum}
                        >
                            {clickedMovie &&
                                <>
                                    {videoData?.results &&
                                        <>
                                            {videoData?.results.length > 0 ? 
                                                <YouTube videoId={videoData?.results[0].key} opts={opts} onReady={onPlayerReady} />
                                                :
                                                <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                                            }
                                        </>
                                    }
                                    <BigTitle>{clickedMovie.title}</BigTitle>
                                    {(active && chainId === 5) && <BuyBtn>구매하기</BuyBtn>} 
                                    {(active && chainId !== 5) && <BuyBtn onClick={switchNetworkToWallet}>네트워크를 변경해 주세요</BuyBtn>} 
                                    {(!active) && <BuyBtn onClick={() => {
                                        connectMM(activate, setBalance, history)
                                    }} >지갑을 연결해 주세요</BuyBtn>} 
                                    <IconWrap>
                                        <Icons>
                                            <IconCircle>
                                                <i className="fas fa-plus"></i>
                                            </IconCircle>
                                            <IconCircle>
                                                <i className="far fa-thumbs-up"></i>
                                            </IconCircle>
                                            <IconCircle>
                                                <i className="far fa-thumbs-down"></i>
                                            </IconCircle>
                                        </Icons>
                                        <BigInfo>
                                            <span>개봉일:</span> {clickedMovie.release_date} <br />
                                            <span>평점:</span> {clickedMovie.vote_average}
                                        </BigInfo>
                                    </IconWrap>
                                    
                                    <BigOverview>{clickedMovie.overview}</BigOverview>
                                </>
                            }
                            <SimInfo>이런 영화는 어때요?</SimInfo>
                            <SimWrap>
                                {simData?.results.slice(0, 4).map((list) => (
                                    <SimCover key={list.id} style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(list.backdrop_path)})` }}>
                                        <SimTitle>{list.title}</SimTitle>
                                    </SimCover>
                                ))}
                            </SimWrap>
                        </BigMovie>
                    </>
                    :
                    null
                }
            </AnimatePresence>
        </>
    );
}

export default Sliders;