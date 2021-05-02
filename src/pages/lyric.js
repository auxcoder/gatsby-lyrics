import "./lyric.css"
import React from 'react'
import Link from 'gatsby-link'
import { graphql } from "gatsby";
// components
import Layout from "../layouts/index";
//
const lyricTemplate = ({data}) => (
  <Layout>
    <Link to={`/album/${data.markdownRemark.fields.album_slug}`}>Go to Album {data.markdownRemark.frontmatter.album}</Link>
    <hr />
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <div className="meta">
      <div><small>Track: {data.markdownRemark.frontmatter.track} </small></div>
      <div><small>Album: {data.markdownRemark.frontmatter.album} </small></div>
      <div><small>Author: {data.markdownRemark.frontmatter.author} </small></div>
      <div><small>Released on: {data.markdownRemark.frontmatter.date} </small></div>
    </div>
    <div className="lyric" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
    }
    fields {
      album_slug
    }
  }
}
`

export default lyricTemplate
