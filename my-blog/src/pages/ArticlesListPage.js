import React from 'react'
import ArticleList from "../components/ArticleList";
import articles from './ArticleContent'
const ArticleListPage = () => (

        <>
            <p>
                Hello, Welcome to my Articles!
            </p>
            <ArticleList articles={articles} />
        </>

    
)

export default ArticleListPage;