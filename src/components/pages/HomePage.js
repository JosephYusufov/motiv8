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
    .author-name{
        color: #8c52ff !important;
        *{
            color: #8c52ff !important;
        }
    }
        .articleContainer{
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0px;
            padding: 0px 10px;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            max-width: 800px;
        
            *{
                color: black;
            }
            img{
                height: 90%;
            }
        }
        .articleContainer:hover{
            background-color: #f0f0f0;
            transition: 0.25s;
        }
        .page-header{ 
            font-size: 4rem !important;
            text-align: center;
        }
        @media only screen and (max-width: 600) {
            .article-img{
                height: 50px;
            }
            .article-description{
                display; none !important;
            }
            .articleContainer{
                flex-direction: column;
            }
        }
    `
    return <Layout>
        <Root>
            {articles? 
                articles.map((article, i) => {
                    return <div onClick={() => history.push(`/article/${article.path}`)}>
                        <div className="articleContainer" key={"article-" + i}>
                            <div>
                                <Header as="h2">{article.title}</Header>
                                {/* <p classname="article-description">{article.description}</p> */}
                                <p className="author-name">{article.author.name} <Icon name="check circle"></Icon></p>
                            </div>
                            <img className="article-img" src={article.image} style={{height: 100}} alt="article"></img>
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
