import React from 'react'
import Link from 'gatsby-link'
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
// components
import Layout from "../layouts/index";
// styles
import "./album.scss"
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
      <div>
      </div>
      {_tracks.map(item => (
        <div key={item.node.id}>
          <Link to={`/${item.node.frontmatter.title_slug}`} className="track">
            <div className="track-number">{item.node.frontmatter.track}</div>

            <GatsbyImage className="track-cover" image={item.node.frontmatter.cover?.childImageSharp.gatsbyImageData} alt="Album cover" />

            <div className="track-meta">
              <div className="track-title">{item.node.frontmatter.title}</div>
              <div className="track-author"><small>Author: {item.node.frontmatter.author}</small></div>
            </div>
          </Link>
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
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 50
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
}
`

export default albumTemplate
