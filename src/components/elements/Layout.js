import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Header, Icon, Advertisement, Image, Divider } from 'semantic-ui-react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from '../../assets/bitwise-logo.png';
import './sideMenu.css';

const Root = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
    font-family: 'Noto Sans', sans-serif;
    *{
        font-family: 'Noto Sans', sans-serif;
    }
    height: 100vh;
    display: grid;
    grid-template-columns: 200px 1fr 350px;
    grid-template-areas: 
        "sidebar content adbar";

    p{
        font-size: 1.5rem;
    }        
    .selected-nav{
        *{
        color: #8c52ff;
        }
    }
    .feedContainer{
    }
    .content{
        margin: 30px 20px;
        // margin-top: 10px;
        grid-area: content;
        display: flex;
        justify-content: center;
        // width: 100%;
        // max-width: 800px;
    
        // width: 100%;
    }
    .sidebar{
        height: 100vh;
        grid-area: sidebar;
        height: 100%; /* Full-height: remove this if you want "auto" height */
    }
    .sidebar-content{
        width: 200px;
        position: fixed; /* Fixed Sidebar (stay in place on scroll) */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        padding-left: 30px;
        padding-top: 30px;
        overflow-x: hidden; /* Disable horizontal scroll */
        *{
            display: block;
            margin: 15px 0px;
            padding: 0;
        }
    }
    .adbar{
        height: 100vh;
        grid-area: adbar;
        // background-color: #cccccc;
        height: 100%; /* Full-height: remove this if you want "auto" height */
    }
    .adbar-content{
        width: 350px;
        // background-color: #cccccc;
        position: fixed; /* Fixed Sidebar (stay in place on scroll) */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        overflow-x: hidden; /* Disable horizontal scroll */
        display: flex;
        flex-direction: column;
        height: 100vh;
        align-items: center;
        justify-content: space-around;
    }
    .nav-link{
        padding: 2px;
    }
    .nav-link:hover{
        color: #8c52ff;
        transition: 0.15s;
    }
    .author{
        width: 100%;
        display: flex;
        flex-direction: column;
        jistify-content: center;
        align-items: center;
        padding: 0px 10%;
        p{
            font-size: 1.3rem !important;
        }
    }
    .icons{
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: space-between;
        i{
            cursor: pointer;
            padding: 2px;
        }
        i:hover{
            color: #8c52ff;
            transition: 0.25s;
        }
    }
    .mobile-navbar{
        display: none;
        *{
            display: none;
        }
    }
    h1{
        font-size: 3rem;
    }
    #banner-ad{
        width: 100%;
        margin-bottom: 15px;
    }
    @media only screen and (max-width: 1100px) {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 200px;
        grid-template-areas: 
            "content adbar";
        .adbar-content{
            width: 200px;
        }
        .mobile-navbar{
            .logo-container{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            display: block;
            z-index: 3;
            overflow: hidden;
            position: fixed; /* Set the navbar to fixed position */
            top: 0; /* Position the navbar at the top of the page */
            width: 100%; /* Full width */
            height: 50px;
            background-color: white;
            border-bottom: 1px solid black;
            *{
                display: block;
            }
        }
        .content{
            margin-top: 100px;
        }

    }
    @media only screen and (max-width: 600px) {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: 
            "content";
        p{
            font-size: 1.5rem;
        }        
        .mobile-navbar{
            .logo-container{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
            display: block;
            z-index: 3;
            overflow: hidden;
            position: fixed; /* Set the navbar to fixed position */
            top: 0; /* Position the navbar at the top of the page */
            width: 100%; /* Full width */
            height: 50px;
            background-color: white;
            border-bottom: 1px solid black;
            *{
                display: block;
            }
        }
        .content{
            margin-top: 100px;
        }
    }
`
const Layout = ({meta, children}) => {
    const [author, setAuthor] = useState({});
    const history = useHistory();
    const [width, setWidth] = useState('normal');
    useEffect(() => {
        if(meta){
            setAuthor(meta.author);
        };
    },[meta]);

    function checkWidth(x) {
        if (x.matches) { // If media query matches
            setWidth('small');
            // console.log(width);
        } else {
            setWidth('normal');
            // console.log(width);
        }
    };
    useEffect(() => {     
        var x = window.matchMedia("(max-width: 1100px)");
        checkWidth(x); // Call listener function at run time
        x.addListener(checkWidth); // Attach listener function on state changes   
    });

    return <>
        <Menu id="sidenav-menu" pageWrapId="page-wrap">
            <NavLink exact to='/' activeClassName="selected-nav"><Header className="nav-link" as="h1">Home</Header></NavLink>
            <Link to='/' activeClassName="selected-nav"><Header className="nav-link" as="h1">Search <Icon size="tiny" style={{fontSize: "1em", margin: 0}} name="search"/></Header></Link>
            <NavLink exact to='/software' activeClassName="selected-nav"><Header className="nav-link" as="h1">Software</Header></NavLink>
            <NavLink exact to='/hardware' activeClassName="selected-nav"><Header className="nav-link" as="h1">Hardware</Header></NavLink>
            <NavLink exact to='/business' activeClassName="selected-nav"><Header className="nav-link" as="h1">Business</Header></NavLink>
            <NavLink exact to='/gaming' activeClassName="selected-nav"><Header className="nav-link" as="h1">Gaming</Header></NavLink>
        </Menu>
        <Root id="page-wrap">
        <div className="mobile-navbar">
            <div className="logo-container">
                <img onClick={() => {history.push('/')}} style={{cursor: "pointer"}} src={logo} height="40px" alt="logo"></img>
            </div>
        </div>
            <div className="sidebar" >
                <div className="sidebar-content">
                    <Image onClick={() => history.push('/')} src={logo} style={{cursor: "pointer"}}></Image>
                    <Divider></Divider>
                    <NavLink exact to='/' activeClassName="selected-nav"><Header className="nav-link" as="h2">Home</Header></NavLink>
                    <Link to='/' activeClassName="selected-nav"><Header className="nav-link" as="h2">Search <Icon size="tiny" style={{fontSize: "1em", margin: 0}} name="search"/></Header></Link>
                    <NavLink exact to='/software' activeClassName="selected-nav"><Header className="nav-link" as="h2">Software</Header></NavLink>
                    <NavLink exact to='/hardware' activeClassName="selected-nav"><Header className="nav-link" as="h2">Hardware</Header></NavLink>
                    <NavLink exact to='/business' activeClassName="selected-nav"><Header className="nav-link" as="h2">Business</Header></NavLink>
                    <NavLink exact to='/gaming' activeClassName="selected-nav"><Header className="nav-link" as="h2">Gaming</Header></NavLink>
                </div>
            </div>
            <div className="content">
                <div style={{width: '100%'}}>
                    <Advertisement id="banner-ad" unit="banner" test='banner'></Advertisement>
                    {children}
                </div>
            </div>
            <div className="adbar">
                <div className="adbar-content">
                    <div className="author">
                        {author.profilePicture && <Image fluid rounded src={author.profilePicture} alt="Profile"></Image>}
                        <Header as='h2'>{author.name && author.name}</Header>
                        <p>{author.description && author.description}</p>
                        <div className="icons">
                            {author.facebook && <i className="big facebook f icon"></i>}
                            {author.youtube && <i className="big youtube icon"></i>}               
                            {author.instagram && <i className="big instagram icon"></i>}     
                            {author.twitter && <i className="big twitter icon"></i>}
                        </div>
                    </div>
                    <Advertisement id="adbar-ad" unit={`${width === 'normal'? 'large' : 'small'} rectangle`} test="rectangle"></Advertisement>
                </div>
            </div>
        </Root>
    </>;
};

export default Layout;