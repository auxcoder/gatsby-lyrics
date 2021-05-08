import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
// components
import Header from '../components/header'
import Menu from '../components/menu'
import '../styles/index.scss'
//
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: 'Songs Lyrics',
          },
          { name: 'keywords', content: 'lyrics, music, records' },
        ]}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Menu />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
export default Layout
