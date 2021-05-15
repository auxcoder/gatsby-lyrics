import React from 'react'
import Link from 'gatsby-link'
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
// components
import Layout from "../layouts/index";
// styles
import "./lyric.scss"
//
const lyricTemplate = ({data}) => (
  <Layout>
    <div id="track">
      <Link to={`/album/${data.markdownRemark.fields.album_slug}`}>Go to Album {data.markdownRemark.frontmatter.album}</Link>

      <hr />

      <div className="track-header">
        <GatsbyImage className="album-cover" image={data.markdownRemark.frontmatter.cover?.childImageSharp.gatsbyImageData} alt="Album cover" />
        <h1 className="track-title">{data.markdownRemark.frontmatter.title}</h1>
      </div>

      <div className="meta">
        <div><small>Track: {data.markdownRemark.frontmatter.track} </small></div>
        <div><small>Album: {data.markdownRemark.frontmatter.album} </small></div>
        <div><small>Author: {data.markdownRemark.frontmatter.author} </small></div>
        <div><small>Released on: {data.markdownRemark.frontmatter.date} </small></div>
      </div>
      <div className="lyric" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </div>
  </Layout>
)

export const pageQuery = graphql`
query LyricItem($album: String, $title: String) {
  markdownRemark(frontmatter: {album: {eq: $album}, title: {eq: $title}}) {
    html
    frontmatter {
      title_slug
      title
      author
      date
      album
      track
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
    fields {
      album_slug
    }
  }
}
`

export default lyricTemplate
