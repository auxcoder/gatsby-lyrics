const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
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
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const {createPage} = boundActionCreators
    const entries = res.data.allMarkdownRemark.edges

    // create page for each lyric
    entries.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/lyric-page.js'),
      })
    })
  })
}
