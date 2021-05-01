import "./lyric.css"
import React from 'react'
import Link from 'gatsby-link'
import { graphql } from "gatsby";
// components
import Layout from "../layouts/index";
//
const lyricTemplate = ({data}) => (
  <Layout>
    <Link to="/">Go Back</Link>
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
}`

export default lyricTemplate
