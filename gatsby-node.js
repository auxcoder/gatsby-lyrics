const path = require('path')
const _ = require("lodash")

// https://www.gatsbyjs.com/docs/mdx/programmatically-creating-pages/#generate-slugs
// https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/#how-to-add-query-variables-to-a-page-query

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = _.kebabCase(node.frontmatter.album)
    createNodeField({
      node,
      name: `album_slug`,
      value: slug,
    })
  }
}

exports.createPages = ({actions, graphql}) => {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              track
              title_slug
              title
              date
              album
              author
            }
            fields {
              album_slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    const {createPage} = actions
    const entries = res.data.allMarkdownRemark.edges

    // create page for each lyric
    entries.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.title_slug,
        component: path.resolve('src/pages/lyric.js'),
        context: {
          title: node.frontmatter.title,
          album: node.frontmatter.album,
        },
      })
    })

    // collect the encountered albums
    const _albumsFound = []
    const _albumWithMeta = []
    entries.forEach(({node}) => {
      const _album = node.frontmatter.album
      if (_albumsFound.indexOf(_album) === -1) {
        _albumsFound.push(_album)
        _albumWithMeta.push(node)
      }
    })

    // create a page for each album
    _albumWithMeta.forEach(node => {
      createPage({
        path: `album/${node.fields.album_slug}`,
        component: path.resolve('src/pages/album.js'),
        context: node.frontmatter,
      })
    })
  })
}
