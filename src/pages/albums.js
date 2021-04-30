import React from 'react'
import Link from 'gatsby-link'

const AlbumsPage = ({ data }) => {
  const _albumsLooUp = [];
  const albums = data.allMarkdownRemark.edges.reduce((acc, curr) => {
      if (!_albumsLooUp.includes(curr.node.frontmatter.album)) {
        _albumsLooUp.push(curr.node.frontmatter.album);
        acc.push(curr.node);
      }
      return acc;
  }, []).sort((a, b) => {
    const nameA = a.frontmatter.date;
    const nameB = b.frontmatter.date;
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  })

  return (
    <div>
      <h1>Albums</h1>

      {albums.map(item => (
        <div key={item.id}>
          <Link to={`album/${item.frontmatter.album.toLowerCase().replaceAll(' ', '-')}`}>{item.frontmatter.album} ({item.frontmatter.date})</Link>
        </div>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query AlbumsIndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___album, frontmatter___track], order: ASC}) {
      edges {
        node {
          id
          frontmatter {
            album
            path
            date
          }
        }
      }
    }
  }
`

export default AlbumsPage
