import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, Route, useHistory, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  font-family: "GmarketSansMedium";
    font-weight: bold;
    z-index: 99;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.div)`
  margin-right: 50px;
  img{
    width: 100px;
    height: 34px;
}
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled(motion.li)`
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  };
`;
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  svg {
    height: 25px;
  }
  z-index: 1;
`;
const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: ${(props) => props.theme.red};
`;
const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    left: -205px;
    background-color: black;
    border: 1px solid whitesmoke;
    height: 35px;
    width: 230px;
    z-index: -10;
    padding-left: 40px;
    color: white;
`;
const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)"
    },
}
const SignupBtn = styled(motion.button)`  
    font-weight: bold;
    width: 100px;
    height: 30px;
    margin-left: 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
        background-color: rgba(255, 4, 88, 0.7);
    }
`;

interface IForm {
    keyword: string;
}

function Header() {
    const homeMatch = useRouteMatch("/home");
    const tvMatch = useRouteMatch("/tv");
    const startMatch = useRouteMatch("/");
    const signInMatch = useRouteMatch("/signIn");
    const signUpMatch = useRouteMatch("/signUp");
    const [searchOpen, setSearchOpen] = useState(false);
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useViewportScroll();
    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({ scaleX: 0, })
        } else {
            inputAnimation.start({ scaleX: 1, })
        }
        setSearchOpen((prev) => !prev);
    };
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start("scroll")
            } else {
                navAnimation.start("top")
            }
        })
    }, [scrollY, navAnimation]);
    const history = useHistory();
    const { register, handleSubmit } = useForm<IForm>();
    const onVaild = (data: IForm) => {
        history.push(`/search?keyword=${data.keyword}`);
    }
    return (
        <Nav
            variants={navVariants}
            animate={navAnimation}
            initial={"top"}>
            <Col>
                <Link to="/home">
                    <Logo>
                        <img alt="logo" src={`${process.env.PUBLIC_URL}/asset/monviewLogoVer2.png`} />
                    </Logo>
                </Link>
                <Items>
                    <Item>
                        <Link to="/home">
                            홈 {homeMatch?.isExact && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                    <Item>
                        <Link to="/tv">
                            TV 시리즈 {tvMatch && <Circle layoutId="circle" />}
                        </Link>
                    </Item>
                    <Item>
                    </Item>
                    <Item>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onVaild)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -200 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <Input
                        {...register("keyword", { required: true, minLength: 1 })}
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "linear" }}
                        placeholder="원하는 제목, 장르, 배우를 검색해보세요!"
                    />
                </Search>
                <Route>
                    {homeMatch || tvMatch || startMatch?.isExact || signUpMatch ?
                        <Link to="signIn">
                            <SignupBtn color="red">로그인</SignupBtn>
                        </Link>
                        :
                        null
                    }
                    {signInMatch &&
                        <Link to="signUp">
                            <SignupBtn>회원가입</SignupBtn>
                        </Link>
                    }
                </Route>
            </Col>
        </Nav >
    );
}

export default Header;