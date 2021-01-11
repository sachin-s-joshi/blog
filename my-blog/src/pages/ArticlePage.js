import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import articles from './ArticleContent'

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const articleObj = articles.find(arti => arti.name === name)

    const remainingPost = articles.filter(article => article.name !== name)
    // console.log(remainingPost)

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        // setArticleInfo( {upvotes: Math.ceil(Math.random()*10)})

        const fetchData = async () => {
            const result = await fetch(`/api/article/${name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    return (
        <>
            <h1>
                This is the {articleObj.title} Article
            </h1>
            <p>This article is upvoted {articleInfo.upvotes} times</p>
            {articleObj.content.map((para, key) => (
                <p key={key}>
                    {para}
                </p>
            ))}
            <ArticleList articles={remainingPost} />
        </>
    )
}

export default ArticlePage;