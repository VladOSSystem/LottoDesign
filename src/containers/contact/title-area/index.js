import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {useStaticQuery, graphql} from 'gatsby'
import Heading from '../../../components/shared/heading'
import {ContactTitleWrap} from './title-area.stc'

const TitleArea = ({titleCSS, taglineCSS}) => {
    const ContactTitleData = useStaticQuery(graphql `
        query ContactTitleQuery {
            contactJson(id: {eq: "contact-page-header"}) {
                title
                tagline
            }
            wordpressPage(slug: {eq: "contact-us"}) {
                slug
                title
                featured_media {
                  localFile {
                    childImageSharp {
                      fixed {
                         aspectRatio
                          src
                          width
                          height
                          srcSet
                      }
                    }
                  }
                }
              }
        }
    `);
    const {title, tagline} = ContactTitleData.contactJson
    return (
        <ContactTitleWrap>
           
        </ContactTitleWrap>
    )
}

TitleArea.defaultProps = {
    titleCSS: {
        as: "h5",
        fontSize: [1],
        textTransform: "capitalize",
        mb: "17px"
    },
    taglineCSS: {
        color: "secondaryColor",
        fontSize: [4, 5],
        fontWeight: "bold",
        lineHeight: [1.4, 1.375]
    }
}

export default TitleArea
