import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
// components
import Layout from "../layouts/index";
//
const albumsPage = ({ data }) => {
  const _albumsLooUp = [];
  const albums = data?.allMarkdownRemark.edges.reduce((acc, curr) => {
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
    <Layout>
      <h1>Albums</h1>

      <div className="covers">
      {albums.map(node => (
        <div key={node.id} className="card">
          <Link to={`album/${node.fields.album_slug}`} >
            <div className="cover-overlay"></div>
            <GatsbyImage className="cover" image={node.frontmatter.cover?.childImageSharp.gatsbyImageData} alt="Album cover" />
            <div className="cover-content">
              <div className="cover-title">{node.frontmatter.album} ({node.frontmatter.date})</div>
              <div className="cover-bottom">
                <div className="cover-tracks">{node.frontmatter.album}</div>
                <div className="cover-year">{node.frontmatter.date}</div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      </div>
    </Layout>
  )
}

export default albumsPage;

// gatsbyImageData(layout: FULL_WIDTH)
export const pageQuery = graphql`
query AlbumsIndexQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___album, frontmatter___track], order: ASC}) {
    edges {
      node {
        id
        frontmatter {
          album
          title_slug
          date
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 250
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        fields {
          album_slug
        }
      }
    }
  }
}
`
