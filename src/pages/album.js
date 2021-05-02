import "./lyric.css"
import React from 'react'
import Link from 'gatsby-link'
import { graphql } from "gatsby";
// components
import Layout from "../layouts/index";
//
const albumTemplate = ({data, pageContext}) => {
  const _tracks = data.allMarkdownRemark.edges
  return (
    <Layout>
      <Link to="/">Go to Albums</Link>
      <h1>Album: {pageContext.album}</h1>
      <div>
        <small>Interpreter: {pageContext.author} </small>,
        <small>Released on: {pageContext.date} </small>
      </div>

      {_tracks.map(item => (
        <div key={item.node.id}>
          <Link to={`/${item.node.frontmatter.title_slug}`}>{item.node.frontmatter.track} - {item.node.frontmatter.title}</Link>
          <div className="meta">
            <small>Author: {item.node.frontmatter.author} </small>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
query AlbumTracks($album: String!) {
  allMarkdownRemark(
    filter: {frontmatter: {album: {eq: $album}}}
    sort: {fields: [frontmatter___track], order: ASC}
  ) {
    edges {
      node {
        id
        frontmatter {
          track
          title_slug
          title
          date
          author
          album
        }
      }
    }
  }
}
`

export default albumTemplate
