import "./lyric.css"
import React from 'react'
import Link from 'gatsby-link'

export default function Template({ data }) {
  const item = data.markdownRemark

  return (
    <div>
      <Link to="/blog">Go Back</Link>
      <hr />
      <h1>{item.frontmatter.title}</h1>
      <div className="meta">
        <div><small>Track: {item.frontmatter.track} </small></div>
        <div><small>Album: {item.frontmatter.album} </small></div>
        <div><small>Author: {item.frontmatter.author} </small></div>
        <div><small>Released on: {item.frontmatter.date} </small></div>
      </div>
      <div className="lyric" dangerouslySetInnerHTML={{ __html: item.html }} />
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
        album
        track
      }
    }
  }
`
