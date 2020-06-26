import styled from 'styled-components';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Loader } from 'semantic-ui-react';
import { addToMailingList } from '../../services/MailingListService';

const Root = styled.div`
    .email-form{
        padding: 5px 0px;
        border: 1px solid #8c52ff;
        background: #8c52ff20;
        border-radius: 5px;
        margin-bottom: 0px;
        text-align: center;
        position: relative;
        h2{
            margin: 0;
            margin-bottom: 10px;
            color: #8c52ff;
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
            text-align: center;
            width: 300px;
            padding: 10px;
            border: 2px solid #8c52ff;
            background: #8c52ff;
            color: #FFFFFF;
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
        margin-bottom: 0;
        padding: 10px;
    }
`
const MailingList = ({noCloseButton, style, callback}) => {
    const [subscribeStatus, setSubscribeStatus] = useState('Subscribe');
    const emailForm = useRef();
    const userEmail = useRef();

    const subscribe = () => {
        setSubscribeStatus(<Loader active inline size="small" />);
        addToMailingList({
            email_address: userEmail.current.value,
            status: "subscribed"
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                setSubscribeStatus("alreadySubscribed");
                callback();
            } else {
                setSubscribeStatus("Subscribe");
            }
        });
    };


    return <Root>
        {subscribeStatus !== "alreadySubscribed" ?
            <div style={style} className="email-form" ref={emailForm}>
                {noCloseButton? <Fragment/> : <button id="close-form" onClick={() => { emailForm.current.style.display = "none"; }} >X</button>}
                <h2>Join our Mailing List</h2>
                <p className="warning-message">We will <span className="emphasis">NEVER</span> send spam.</p>
                <input ref={userEmail} placeholder="Enter your Email"></input> <br></br>
                <button id="subscribe-button" onClick={subscribe}>{subscribeStatus}</button>
            </div>
            :
            <div style={style} className="subscribe-success">
                <h2>👍 You've subscribed to the mailing list</h2>
            </div>
        }
    </Root>
};

export default MailingList;