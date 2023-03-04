import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTv, IGetMoviesResult } from "../api";
import Sliders from "./Components/Sliders";
import TvSliders from "./Components/TvSliders";

const Wrapper = styled.div`
background-color: black;
overflow-x: hidden;
overflow-y: hidden;
`;

const SliderWrap = styled.div`
    padding-top: 200px;
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data: movieData, isLoading } = useQuery<IGetMoviesResult>(["simMovies", keyword], () => getSearchMovies(keyword + ""));
    const { data: tvData } = useQuery<IGetMoviesResult>(["simTV", keyword], () => getSearchTv(keyword + ""));
    const [clickSlider, setClickSlider] = useState(0);

    return (
        <Wrapper>
            {

                isLoading ? "Loding..." :
                    <>
                        <SliderWrap onClick={() => setClickSlider(1)}>
                            <Sliders data={movieData} title={`- ${keyword} 관련 영화`} sliderNum={1} clickSlider={clickSlider} />
                        </SliderWrap>
                       
                        <SliderWrap onClick={() => setClickSlider(2)}>
                            <TvSliders data={tvData} title={`- ${keyword} 관련 TV 시리즈`} sliderNum={1} clickSlider={clickSlider} />
                        </SliderWrap>
                    </>
            }
        </Wrapper>
    );
}

export default Search;