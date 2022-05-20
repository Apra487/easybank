import { truncate } from "lodash"

import data  from "../data.json"

const Articles = () => {
  return (
    <section className="articles container">
      <h2 className="articles__headline">Latest Articles</h2>
      <div className="articles__latest-articles">
        {data.articles.map((article, index) => (
          <div className="article-box" key={index}>
            <div className="article-box--image">
              <img src={article.img} alt={article.title} />
            </div>
            <span className="article-box--author">By {article.author}</span>
            <h4 className="article-box--title">{article.title}</h4>
            <p className="article-box--content small">
              {truncate(article.content, { length: 140, omission: "..." })}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Articles
