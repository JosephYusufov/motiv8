import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../elements/Layout.js';
import NotFound from '../elements/NotFound.js';
import {
    useRouteMatch
} from "react-router-dom";
import { Container, Header, Loader, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Article = () => {
    const [content, setContent] = useState('')
    const [meta, setMeta] = useState({
        title: '',
        description: '',
        author: {
            name: '',
            youtube: '',
            facebook: '',
            instagram: ''
        }
    })
    const [success, setSuccess] = useState(null);
    const {params} = useRouteMatch('/article/:articleId');
    useEffect(() => {
        fetch(`https://josephyusufov.me/${params.articleId}/index.md`)
            .then((res) => {
                setSuccess(res.ok);
                return res.text();
            }).then((data) => {
                setContent(data);
                return fetch(`https://josephyusufov.me/${params.articleId}/meta.json`);
            }).then((res) => {
                return res.json();
            }).then((meta) => {
                setMeta(meta);
            });
    }, []);

    return <Layout meta={meta}>
        <ArticleBox>
            <Loader active={success == null}></Loader>
            {success === true? <>
                    <Image alt="banner" style={{marginBottom: 30}}fluid rounded src={meta.image}/>
                    <StyledMarkdown>
                        <ReactMarkdown 
                            source={content}
                            renderers={{
                                header: <Header as="h1"/>
                            }}
                        />
                    </StyledMarkdown>
                </>
            : success === false &&
                <NotFound/>
            }
        </ArticleBox>
    </Layout>
};

const StyledMarkdown = styled.div`
    h1{
        font-size: 4rem !important;
    }
    p{
        font-size: 1.5rem !important;
    }
    *{
        margin: 30px;
    }

`

const ArticleBox = styled.div`
    width: 90%;
    max-width: 800px;
`

export default Article;
