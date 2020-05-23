import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import Layout from './../elements/Layout.js';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();
    const [articles, setArticles] = useState(null);
    useEffect(() => {
        fetch(`https://josephyusufov.me/list`)
            .then(res => {
                // console.log(res);
                return res.json();
            }).then(jsonData => {
                console.log(jsonData);
                setArticles(jsonData);
            })
    }, [])

    const Root = styled.div`
        .articleContainer{
            height: 20vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0px;
            padding: 0px 10px;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            *{
                color: black;
            }
            img{
                height: 90%;
            }
        }
        .articleContainer:hover{
            background-color: #fcfcff;
            // *{
            //     color: #31b9ffaa;
            // }
            border: 1px solid #31b9ffaa;
            transition: 0.25s;
        }
        .page-header{ 
            font-size: 4rem !important;
            text-align: center;
        }
    `
    return <Layout>
        <Root>
            <Link to='/'><Header as="h1" className="page-header" >motiv8</Header></Link>
            <Divider></Divider>
            {articles? 
                articles.map((article, i) => {
                    return <div fluid onClick={() => history.push(`/article/${article.path}`)}>
                        <div className="articleContainer" key={"article-" + i}>
                            <div>
                                <Header as="h2">{article.title}</Header>
                                <p>{article.description}</p>
                                <p>{article.author.name}</p>
                            </div>
                            <img src={article.image} alt="article"></img>
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
