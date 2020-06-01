/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site, allWordpressSiteMetadata, wordpressPage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        allWordpressSiteMetadata {
          edges {
            node {
              description
            }
          }
        }
        wordpressPage(path: {eq: "/"}) {
          id
          title
          content
          featured_media {
            localFile {
              childImageSharp {
                resolutions(width:1920, height:1080) {
                  src
                  width
                  height
                  srcSet
                  aspectRatio
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          property: `og:image`,
          content: wordpressPage.featured_media.localFile.childImageSharp.resolutions.src,
        },
        {
          name: `description`,
          content: allWordpressSiteMetadata.edges[0].node.description,
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: allWordpressSiteMetadata.edges[0].node.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'lotto',
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: allWordpressSiteMetadata.edges[0].node.description,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
