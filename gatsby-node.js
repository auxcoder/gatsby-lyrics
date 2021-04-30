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

    // collect the encountered albums
    const _albumsFound = []
    const _albumWithMeta = []
    entries.forEach(({node}) => {
      const _album = node.frontmatter.album
      if (_albumsFound.indexOf(_album) === -1) {
        _albumsFound.push(_album)
        _albumWithMeta.push({
          date: node.frontmatter.date,
          album: node.frontmatter.album,
          author: node.frontmatter.author,
        })
      }
    })

    // create a page for each album
    _albumWithMeta.forEach(item => {
      createPage({
        path: `album/${item.album.toLowerCase().replaceAll(' ', '-')}`,
        component: path.resolve('src/templates/album-page.js'),
        context: item,
      })
    })
  })
}
