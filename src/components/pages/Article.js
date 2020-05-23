import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../elements/Layout.js';
import NotFound from '../elements/NotFound.js';
import {
    useRouteMatch
} from "react-router-dom";
import { Container } from 'semantic-ui-react';

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
    const [success, setSuccess] = useState(false)
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

    return <Layout>
        <Container text>
            {success? <>
                    <div>
                        <h3>{`Author: ${meta.author.name}`}</h3>
                        <h3>{`Facebook: ${meta.author.facebook}`}</h3>
                        <h3>{`Instagram: ${meta.author.instagram}`}</h3>
                        <h3>{`YouTube: ${meta.author.youtube}`}</h3>
                    </div>
                    <ReactMarkdown source={content}/>
                </>
            :
                <NotFound/>
            }
        </Container>
    </Layout>
};

export default Article;
