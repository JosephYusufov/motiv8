import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Header, Icon, Advertisement, Image, Divider, Loader } from 'semantic-ui-react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Footer from './Footer.js';
import logo from '../../assets/bitwise-logo.png';
import './sideMenu.css';

import { addToMailingList } from '../../services/MailingListService';

const FontProvider = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');    
    font-family: 'Manrope', sans-serif;    
        *{
            font-family: 'Manrope', sans-serif;
        }

`
const Root = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 200px 1fr 350px;
    grid-template-areas: 
        "sidebar content adbar";

    p{
        font-size: 1.5rem;
    }        
    li{
        font-size: 1.5rem;
        line-height: 1.8rem;
    }        

    .mobile-ad
    .selected-nav *{
        color: #8c52ff;
    }
    .feedContainer{
    }
    .content{
        margin-top: 30px;
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
        font-family: 'Manrope', sans-serif;
    }
    .nav-link:hover{
        color: #8c52ff;
        transition: 0.15s;
    }
    .author{
        width: 100%;
        display: flex;
        flex-direction: column;
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
        max-width: 800px;
        // margin: auto;
        margin-bottom: 15px;
    }
    .email-form{
        padding: 5px 0px;
        border: 1px solid #8c52ff;
        border-radius: 5px;
        margin-bottom: 30px;
        text-align: center;
        position: relative;
        h2{
            margin: 0;
        }
        input{
            display: inline-block;
            width: 300px;
            text-align: center;
            border: 2px solid #8c52ff;
            border-radius: 5px;
            margin-bottom: 10px;
            padding: 10px;
        }
        button{
            cursor: pointer;
        }
        #close-form{
            border: 2px solid #8c52ff;
            background: #8c52ff;
            color: #FFFFFF;
            border-radius: 100px;
            padding: 3px 7px;
            /* margin-left: 7px;    */
            position: absolute;
            top: 7px;
            left: 7px;
        }   
        #subscribe-button{
            cursor: pointer;
            display: inline-block;  
            margin-left: 15px;
            text-align: center;
            line-height: 50px;
            /* padding: 10px; */
            height: 50px;
            width: 100px;
            border: 2px solid #8c52ff;
            /* background: #8c52ff20; */
            color: #8c52ff;
            border-radius: 100px;
            margin-bottom: 10px;
            *{
                margin: 0px;
                padding: 0px;
            }
        }
        .warning-message{
            font-size: 1rem;
        }
    }
    .subscribe-success{
        background: #00FF0020;
        border: 2px solid #00FF00;
        border-radius: 5px;
        margin-bottom: 30px;
        padding: 10px;
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
            margin-top: 40px;
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
    }
`
const Layout = ({meta, children}) => {
    const [author, setAuthor] = useState({});
    const history = useHistory();
    const [width, setWidth] = useState('normal');
    const [subscribeStatus, setSubscribeStatus] = useState('Subscribe');
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

    const emailForm = useRef();
    const userEmail = useRef();

    const subscribe = () => {
        setSubscribeStatus(<Loader active inline size="small" />);
        addToMailingList({
            email_address: userEmail.current.value,
            status: "subscribed"
        }).then(res => {
            console.log(res);
            if(res.status === 200){
                setSubscribeStatus("alreadySubscribed");
            } else {
                setSubscribeStatus("Subscribe");
            }
        });
    };

    return <FontProvider>
        <Menu id="sidenav-menu" pageWrapId="page-wrap" disableAutoFocus>
            <NavLink exact to='/' activeClassName="selected-nav"><h1 className="nav-link">Home</h1></NavLink>
            <Link to='/' activeClassName="selected-nav"><h1 className="nav-link">Search <Icon size="tiny" style={{fontSize: "1em", margin: 0}} name="search"/></h1></Link>
            <NavLink exact to='/software' activeClassName="selected-nav"><h1 className="nav-link" as="h1">Software</h1></NavLink>
            <NavLink exact to='/hardware' activeClassName="selected-nav"><h1 className="nav-link" as="h1">Hardware</h1></NavLink>
            <NavLink exact to='/business' activeClassName="selected-nav"><h1 className="nav-link" as="h1">Business</h1></NavLink>
            <NavLink exact to='/gaming' activeClassName="selected-nav"><h1 className="nav-link" as="h1">Gaming</h1></NavLink>
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
                    <div style={{ padding: "20px 10px", width: "100%", display: "flex", justifyContent: "center"}}>
                        <div style={{width: "100%", maxWidth: 800}}>
                            {/* <Advertisement id="banner-ad" unit="banner" test='banner'></Advertisement> */}
                            {subscribeStatus !== "alreadySubscribed"?                            
                                <div className="email-form" ref={emailForm}>
                                    <button id="close-form" onClick={() => {emailForm.current.style.display = "none";}} >X</button>
                                    <h2>Join our Mailing List</h2>
                                    <p className="warning-message">We will <span className="emphasis">NEVER</span> send spam.</p>
                                    <input ref={userEmail} placeholder="Enter your Email"></input>
                                    <div id="subscribe-button" onClick={subscribe}>{subscribeStatus}</div>
                                </div>
                            : 
                                <div className="subscribe-success">
                                    <h2>👍 You've subscribed to the mailing list</h2>
                                </div>
                            }
                            {children}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
            <div className="adbar">
                <div className="adbar-content">
                    <div className="author">
                        {author.profilePicture && <Image fluid rounded src={author.profilePicture} alt="Profile"></Image>}
                        <h2>{author.name && author.name}</h2>
                        <p>{author.description && author.description}</p>
                        <div className="icons">
                            {author.facebook && <i className="big facebook f icon"></i>}
                            {author.youtube && <i className="big youtube icon"></i>}               
                            {author.instagram && <i className="big instagram icon"></i>}     
                            {author.twitter && <i className="big twitter icon"></i>}
                        </div>
                    </div>
                    {/* <Advertisement id="adbar-ad" unit={`${width === 'normal'? 'large' : 'small'} rectangle`} test="rectangle"></Advertisement> */}
                </div>
            </div>
        </Root>
    </FontProvider>;
};

export default Layout;