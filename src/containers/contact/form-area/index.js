import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useStaticQuery, graphql } from 'gatsby'
import SectionTitle from '../../../components/shared/section-title'
import ContactForm from '../../../components/forms/contact-form'
import { ContactFormArea } from './form-area.stc'

const FormArea = ({ sectionTitleCSS }) => {
    const ContantData = useStaticQuery(graphql`
        query ContactContentQuery {
            site {
                siteMetadata {
                  getform_url
                }
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
    `) 
    const { site: { siteMetadata: { getform_url } } } = ContantData;
    return (
        <ContactFormArea>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                            <SectionTitle
                                {...sectionTitleCSS}
                                title={ContantData.wordpressPage.title}
                            />
                        <ContactForm url={getform_url} />
                    </Col>
                </Row>
            </Container>
        </ContactFormArea>
    )
}

FormArea.defaultProps = {
    sectionTitleCSS: {
        mb: '40px'
    }
}

export default FormArea
