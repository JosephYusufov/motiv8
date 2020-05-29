import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    background-color: #8c52ff11;
    padding: 30px;
    @import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');    
    font-family: 'Manrope', sans-serif;    
    *{
        font-family: 'Manrope', sans-serif;
    }
    .flex-container{
        p{
            font-size: 1rem;
            text-decoration: underline;
            cursor: pointer;
        }
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    .copy{
        text-align: center;
        font-size: 1rem;
        color: #00000080
    }
`;

const Footer = ({children, ...others}) => {
    return <Root {...others}>
        <div className="flex-container">
            <p>About</p>
            <p>Contact</p>
            <p>Report</p>
        </div>
        <p class="copy">Copyright Bitwise 2020</p>
    </Root>
};

export default Footer;