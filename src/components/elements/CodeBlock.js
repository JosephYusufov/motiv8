import './prism.css';
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import styled from 'styled-components';

const CodeBlock = ({...code}) => {
    useEffect(() => {
        console.log(code);
        Prism.highlightAll();
        console.log(code.value);
    })
    return <Root>
        <pre>
            <code className={`language-${code.language}`}>
                {`${code.value}`}
            </code>
        </pre>
    </Root>;
};

const Root = styled.div`
    margin: 0px;
    pre{
        margin: 0px;
        word-wrap: break-word;
    }

    @media only screen and (max-width: 600px) {
        pre{
            font-size: 0.7rem;
        }
    }
    code{
        margin: 0px;
    }
    code *{
        margin: 0px;
    }
`
export default CodeBlock;