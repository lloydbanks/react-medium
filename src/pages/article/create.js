import React, { useState, useEffect, useContext } from 'react'
import ArticleForm from '../../components/article'
import useFetch from '../../hooks/useFetch'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../contexts/user'

const CreateArticle = () => {
  const apiUrl = '/articles'
  const [{ response, error }, doFetch] = useFetch(apiUrl)
  const [user] = useContext(UserContext)
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
  const [success, setSuccess] = useState(false)
  const handleSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    })
  }

  useEffect(() => {
    if (!response) return

    setSuccess(true)
  }, [response])

  if (user.logged === false) return <Redirect to="/" />

  if (success) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateArticle
