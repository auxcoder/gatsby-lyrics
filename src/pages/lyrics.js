import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
// components
import Layout from "../layouts/index";
// styles
import "./lyrics.scss"
//
const LyricsPage = ({data}) => (
  <Layout>
    <div id="allAlbums">
      <h1>All Lyrics</h1>

      {data.allMarkdownRemark.group.map((grp, aidx) => (
        <div className="album" key={aidx}>
          {grp.edges.map(item => (
            <div key={item.node.id}>
              <Link to={`../${item.node.frontmatter.title_slug}`} className="track">
                <div className="track-number">{item.node.frontmatter.track}</div>

                <GatsbyImage className="track-cover" image={item.node.frontmatter.cover?.childImageSharp.gatsbyImageData} alt="Album cover" />

                <div className="track-meta">
                  <div className="track-title">{item.node.frontmatter.title}</div>
                  <div className="track-author"><small>Author: {item.node.frontmatter.author}</small></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))
      }
    </div>
  </Layout>
)

export const pageQuery = graphql`
query LyricIndexQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___album, frontmatter___track], order: ASC}) {
    group(field: frontmatter___album) {
      edges {
        node {
          id
          frontmatter {
            album
            track
            title_slug
            title
            date
            author
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
}
`

export default LyricsPage
