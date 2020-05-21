import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Layout from './../elements/Layout.js';
// import { Redirect } from 'react-router';

const HomePage = () => {
    const [articles, setArticles] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:9000/list`)
            .then(res => {
                // console.log(res);
                return res.json();
            }).then(jsonData => {
                console.log(jsonData);
                setArticles(jsonData);
            })
    }, [])

    const styles = {
        articleContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "20px 0px",
            border: "1px solid red",
            cursor: "pointer",
        }
    };

    return <Layout>
        <div>
            <h1>This is the Homepage, Welcome!</h1>
            {articles? 
                articles.map((article, i) => {
                    return <div style={styles.articleContainer} onClick={() => window.location.href = `/article/${article.path}`} key={"article-" + i}>
                        <img src={article.image} alt="article"></img>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p>{article.author.name}</p>
                    </div>;
                })
            :
                <></>
            }
        </div>
    </Layout>
};

export default HomePage;
