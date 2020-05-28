import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../elements/Layout.js';
import NotFound from '../elements/NotFound.js';
import {
    useRouteMatch
} from "react-router-dom";
import { Divider, Header, Loader, Image, Icon } from 'semantic-ui-react';
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
        // console.log(`https://api.readbitwise.com/${params.articleId}/index.md`);
        fetch(`https://api.readbitwise.com/article/${params.articleId}`)
            .then((res) => {
                setSuccess(res.ok);
                return res.text();
            }).then((data) => {
                setContent(data);
                return fetch(`https://api.readbitwise.com/meta/${params.articleId}`);
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
                    <h1 style={{textAlign: "center"}}>{meta && meta.title}</h1>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 30
                    }}>
                        <img width="50px;" src={meta.author.profilePicture} style={{display: "block",  marginRight: 10, borderRadius: 25}}/>
                        <p className="author-verified">{meta.author.name} <Icon name="circle check"></Icon></p>
                    </div>
                    <StyledMarkdown>
                        <ReactMarkdown 
                            source={content}
                            renderers={{
                                header: <Header as="h1"/>
                            }}
                        />
                    </StyledMarkdown>
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <MobileAuthor classname="mobile-author">
                        <div className="author">
                            {meta.author.profilePicture && <Image rounded fluid src={meta.author.profilePicture} alt="Profile"></Image>}
                            <Header as='h2'>{meta.author.name && meta.author.name}</Header>
                            <p>{meta.author.description && meta.author.description}</p>
                            <div className="icons">
                                {meta.author.facebook && <i className="big facebook f icon"></i>}
                                {meta.author.youtube && <i className="big youtube icon"></i>}               
                                {meta.author.instagram && <i className="big instagram icon"></i>}     
                                {meta.author.twitter && <i className="big twitter icon"></i>}
                            </div>
                        </div>
                    </MobileAuthor>
                </>
            : success === false &&
                <NotFound/>
            }
        </ArticleBox>
    </Layout>
};

const MobileAuthor = styled.div`
    display: none;
    margin-bottom: 30px;
    @media only screen and (max-width: 600px) {
        display: block;
    }

`
const StyledMarkdown = styled.div`
    *{
        margin: 30px;
    }

`

const ArticleBox = styled.div`
    width: 100%;
    max-width: 800px;
    .author-verified{
        color: #8c52ff !important;
        text-align: center;
    }
`

export default Article;
