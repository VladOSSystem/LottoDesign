import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {useStaticQuery, graphql} from 'gatsby'
import Image from '../../../components/image'
import {ContactBannerWrap} from './banner-area.stc'

const BannerArea = () => {
    const contactBannerData = useStaticQuery(graphql `
        query ContactBannerQuery {
            contactJson(id: {eq: "contact-page-banner"}) {
                banner {
                    childImageSharp {
                        fluid(maxWidth: 1260, maxHeight: 585, quality: 100, srcSetBreakpoints: 6) {
                            ...GatsbyImageSharpFluid_withWebp
                            presentationWidth
                            presentationHeight
                        }
                    }
                }
            }
            wordpressPage(slug: {eq: "contact-us"}) {
                slug
                title
                featured_media {
                  localFile {
                    childImageSharp {
                        fluid(maxWidth: 1260, maxHeight: 585, quality: 100, srcSetBreakpoints: 6) {
                            presentationWidth
                            presentationHeight
                            src
                            srcSet
                            aspectRatio
                          }
                    }
                  }
                }
              }
        }      
    `);
    const bannerImg = contactBannerData.contactJson.banner.childImageSharp.fluid;
    console.log(contactBannerData.wordpressPage.featured_media.localFile.childImageSharp.fluid)
    return (
        <ContactBannerWrap>
            <Container>
                <Row>
                    <Col lg={12}>
                        <Image fluid={contactBannerData.wordpressPage.featured_media.localFile.childImageSharp.fluid} alt="about banner"/>
                    </Col>
                </Row>
            </Container>
        </ContactBannerWrap>
    )
}

export default BannerArea
