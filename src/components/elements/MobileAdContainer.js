import React from 'react';
import styled from 'styled-components';
import {Advertisement} from 'semantic-ui-react';

const MobileAdContainer = ({children, ...others}) => {
    // useEffect(() => {
    // });
    const Root = styled.div`
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // width: 100%;
        .ad-disclaimer{
            margin-top: 0;
            margin-bottom: 0;
            font-size: 12px;
            // width: 100%;
            text-align: center;
        }
    `
    return <Root className="mobile-ad-container" {...others}>
        {children}
        {Math.round(Math.random() * 0.9) ?
            <div>
                <p className="ad-disclaimer">Advertisement</p>
                {/* <Advertisement style={{width: '100%', height: 200}} unit="small rectangle" test="medium rectangle"></Advertisement> */}
                <p className="ad-disclaimer">Advertisement</p>
            </div>
        :
            <></>
        }
    </Root>;
};

export default MobileAdContainer;