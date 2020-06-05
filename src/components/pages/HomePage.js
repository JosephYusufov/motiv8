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
        .featured{
            transition: 0.25s;
            background: rgb(0,196,204);
            background: linear-gradient(90deg, rgba(0,196,204,1) 0%, rgba(124,42,232,1) 100%);
            border-radius: 5px;
            padding-bottom: 1px;
            padding: 7px 7px 7px 7px;
            .featured-indicator{
                color: #FFFFFF;
                width: 40%;
                text-align: center;
                font-weight: bold;
                padding: 3px;
                margin-left: 20px;
                background: rgb(0,196,204);
                background: linear-gradient(90deg, rgba(0,196,204,1) 0%, rgba(124,42,232,1) 100%);
    
            }
            .articleContainer{
                // flex-direction: column-reverse;
                display: block;
                background: #FFFFFF;
                margin: 0;
                height: 100%;
                .article-img-normal{
                    width: 100%;
                    height: auto;
                }
                h2{
                    font-size: 3rem;
                }
            }
        }
        .featured:hover{
            padding: 1px 1px 13px 13px;
            transition: 0.25s;

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
            .featured{
                .article-info{
                    background-color: #FFFFFF;
                }
            }
        }
    `
    return <Layout>
        <Root>
            {articles? 
                articles.map((article, i) => {
                    return <div style={{width: "100%"}} onClick={() => history.push(`/article/${article.path}`)}>
                        {i > 0?
                        <div className="articleContainer" key={"article-" + i}>
                            <img className="article-img-mobile" style={{marginBottom: 0}} src={article.image} alt="article"></img>
                            <div className="article-info" style={{marginTop: 0}}>
                                <h2>{article.title}</h2>
                                <p className="description">{article.description}</p>
                                <p className="author-name">{article.author.name} <Icon name="check circle"></Icon></p>
                            </div>
                            <img className="article-img-normal" src={article.image} style={{height: 100}} alt="article"></img>
                        </div>
                        :
                        <div className="featured">
                            <div className="articleContainer" key={"article-" + i}>
                                <h3 className="featured-indicator">Featured by Bitwise</h3>
                                <img className="article-img-mobile" style={{marginBottom: 0}} src={article.image} alt="article"></img>
                                <img className="article-img-normal" src={article.image} alt="article"></img>
                                <div className="article-info" style={{marginTop: 0}}>
                                    <h2>{article.title}</h2>
                                    <p className="description">{article.description}</p>
                                    <p className="author-name">{article.author.name} <Icon name="check circle"></Icon></p>
                                </div>
                            </div>
                        </div>
                        }
                    </div>;
                })
            :
                <></>
            }
        </Root>
    </Layout>
};

export default HomePage;
