import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Header, Divider, Icon } from 'semantic-ui-react';
import Layout from './../elements/Layout.js';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();
    const [articles, setArticles] = useState(null);
    // const [width, setWidth] = useState('non-mobile');
    // function checkWidth(x) {
    //     if (x.matches) { // If media query matches
    //         setWidth('mobile');
    //         // console.log(width);
    //     } else {
    //         setWidth('non-mobile');
    //         // console.log(width);
    //     }
    // };
    // useEffect(() => {     
    //     var x = window.matchMedia("(max-width: 600px)");
    //     checkWidth(x); // Call listener function at run time
    //     x.addListener(checkWidth); // Attach listener function on state changes   
    // });

    useEffect(() => {
        fetch(`https://api.readbitwise.com/list`)
            .then(res => {
                // console.log(res);
                return res.json();
            }).then(jsonData => {
                console.log(jsonData);
                setArticles(jsonData);
            })
    }, [])

    const Root = styled.div`
        width: 100%;
        max-width: 800px;
        // margin: auto;
        // text-align: center;
        // display: flex;
        // justify-content: center;
        .author-name{
            color: #8c52ff !important;
            *{
                color: #8c52ff !important;
            }
        }
        .articleContainer{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0px;
            padding: 10px 10px;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            // width: 800px;
            max-width: 800px;
            *{
                color: black;
            }
            img{
                height: 90%;
            }
        }
        .articleContainer:hover{
            background-color: #8c52ff11;
            transition: 0.25s;
        }
        .page-header{ 
            font-size: 4rem !important;
            text-align: center;
        }
        .article-img-mobile{
            display: none;
        }
        .article-img-normal{
            display: inline-block;
        }
        .description{
            color: #000000a0;
            font-size: 1.3rem;
        }
        @media only screen and (max-width: 800px) {
            .article-img-mobile{
                width: 100%;
                // height: 300px;
                display: inline-block;
            }
            .article-img-normal{
                display: none;
            }
            .articleContainer{
                display: block;
                height: auto;
                // flex-direction: column;
            }
            .articleContainer:hover{
                background-color: #fff;
            }
            .article-info{
                background-color: #8c52ff11;
                padding: 20px;
            }
        }
    `
    return <Layout>
        <Root>
            {articles? 
                articles.map((article, i) => {
                    return <div style={{width: "100%"}} onClick={() => history.push(`/article/${article.path}`)}>
                        <div className="articleContainer" key={"article-" + i}>
                            <img className="article-img-mobile" style={{marginBottom: 0}} src={article.image} alt="article"></img>
                            <div className="article-info" style={{marginTop: 0}}>
                                <h2>{article.title}</h2>
                                <p className="description">{article.description}</p>
                                <p className="author-name">{article.author.name} <Icon name="check circle"></Icon></p>
                            </div>
                            <img className="article-img-normal" src={article.image} style={{height: 100}} alt="article"></img>
                        </div>
                    </div>;
                })
            :
                <></>
            }
        </Root>
    </Layout>
};

export default HomePage;
