import "./lyric.css"
import React from 'react'
import Link from 'gatsby-link'

export default function Template({data, pathContext}) {
  const _tracks = data.allMarkdownRemark.edges
  return (
    <div>
      <Link to="/blog">Go Back</Link>
      <h1>Album: {pathContext.album}</h1>
      <div>
        <small>Interpreter: {pathContext.author} </small>,
        <small>Released on: {pathContext.date} </small>
      </div>

      {_tracks.map(item => (
        <div key={item.node.id}>
          <Link to={item.node.frontmatter.path}>{item.node.frontmatter.track} - {item.node.frontmatter.title}</Link>
          <div className="meta">
            <small>Author: {item.node.frontmatter.author} </small>
          </div>
        </div>
      ))}
    </div>
  )
}

export const postQuery = graphql`
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
            path
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
