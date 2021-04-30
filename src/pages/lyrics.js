import React from 'react'
import Link from 'gatsby-link'

const LyricsPage = ({data}) => (
  <div>
    <h1>All Lyrics</h1>

    {data.allMarkdownRemark.edges.map(item => (
      <div key={item.node.id}>
        <Link to={item.node.frontmatter.path}>{item.node.frontmatter.track} - {item.node.frontmatter.title}</Link>
      </div>
    ))}
  </div>
)

export const pageQuery = graphql`
  query LyricIndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___album, frontmatter___track], order: ASC}) {
      edges {
        node {
          id
          frontmatter {
            track
            path
            title
            date
            author
          }
        }
      }
    }
  }
`

export default LyricsPage
