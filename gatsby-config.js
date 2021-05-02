module.exports = {
  siteMetadata: {
    title: 'Lyrics',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages-markdown`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
  ],
}
