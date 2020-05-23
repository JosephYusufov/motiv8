import React from 'react';
import styled from 'styled-components';
import { Header, Icon} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

const Root = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 200px 1fr 350px;
    grid-template-areas: 
        "sidebar content adbar";

    .selected-nav{
        *{
        color: #31b9ffaa;
        }
    }
    .feedContainer{
    }
    .content{
        margin: 0px 20px;
        // margin-top: 10px;
        grid-area: content;
    }
    .sidebar{
        height: 100vh;
        grid-area: sidebar;
        // background-color: #cccccc;
        height: 100%; /* Full-height: remove this if you want "auto" height */
    }
    .sidebar-content{
        width: 200px;
        // background-color: #cccccc;
        position: fixed; /* Fixed Sidebar (stay in place on scroll) */
        z-index: 1; /* Stay on top */
        top: 0; /* Stay at the top */
        padding-left: 30px;
        padding-top: 30px;
        overflow-x: hidden; /* Disable horizontal scroll */
        // display: flex;
        // flex-direction: column;
        // align-items: left;
        // justify-content: center;
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
        height: 100vh;
        align-items: center;
        justify-content: center;
    }
    .nav-link{
        padding: 2px;
    }
    .nav-link:hover{
        // background-color: #31b9ffaa;
        color: #31b9ffaa;
        transition: 0.15s;
    }
`
const Layout = ({children}) => {
    return <Root>
        <div className="sidebar" >
            <div className="sidebar-content">
                <NavLink exact to='/' activeClassName="selected-nav"><Header className="nav-link" as="h1">Home</Header></NavLink>
                <Link to='/' activeClassName="selected-nav"><Header className="nav-link" as="h1">Search <Icon size="tiny" style={{fontSize: "1em", margin: 0}} name="search"/></Header></Link>
                <NavLink exact to='/software' activeClassName="selected-nav"><Header className="nav-link" as="h1">Software</Header></NavLink>
                <NavLink exact to='/hardware' activeClassName="selected-nav"><Header className="nav-link" as="h1">Hardware</Header></NavLink>
                <NavLink exact to='/business' activeClassName="selected-nav"><Header className="nav-link" as="h1">Business</Header></NavLink>
                <NavLink exact to='/gaming' activeClassName="selected-nav"><Header className="nav-link" as="h1">Gaming</Header></NavLink>
            </div>
        </div>
        <div className="content">
            {children}
        </div>
        <div className="adbar">
            <div className="adbar-content">
                <img src="https://placekitten.com/300/200" alt="article"></img>
            </div>
        </div>
    </Root>
};

export default Layout;