import styled from 'styled-components';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Loader } from 'semantic-ui-react';
import { addToMailingList } from '../../services/MailingListService';
import './mailingListStyles.css';
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


    return <div>
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
    </div>
};

export default MailingList;