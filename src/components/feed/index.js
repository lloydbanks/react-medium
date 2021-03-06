import React from 'react'
import { Link } from 'react-router-dom'
import TagList from '../tags/list'
import AddToFavorites from './add'
import { dateFormat } from '../../helpers'

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => {
        const { author } = article

        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profile/${author.username}`}>
                <img src={author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profile/${author.username}`} className="author">
                  {author.username}
                </Link>
                <span className="date">{dateFormat(article.createdAt)}</span>
              </div>
              <div className="pull-xs-right">
                <AddToFavorites
                  favorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  articleSlug={article.slug}
                />
              </div>
            </div>
            <Link to={`/articles/${article.slug}`} className="preview-link">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span>Read more...</span>
              {<TagList tags={article.tagList} />}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Feed
