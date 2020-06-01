import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap';
import { useStaticQuery, graphql } from 'gatsby'
import Heading from '../../../components/shared/heading'
import Text from '../../../components/shared/text'
import {HeroWrapper, HeroBG, HeroTextBox} from './hero-area.stc'

const HeroArea = (props) => {
    const heroData = useStaticQuery(graphql `
        query HomeHeroQuery {
            homeJson(id: {eq: "home-hero-content"}){
                title
                desc
                image {
                    childImageSharp {
                        fluid(maxWidth: 1920, maxHeight: 750, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
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
    `) 
    // console.log(heroData)
    const {title, desc, image} = heroData.homeJson;
    const {headingStyle, textStyle, textHeadingStyle} = props;
    return (
        <HeroWrapper>
            <HeroBG fluid={heroData.wordpressPage.featured_media.localFile.childImageSharp.resolutions}/>
            <Container>
                <Row>
                    <Col lg={6}>
                        <HeroTextBox>
                            {title && <Heading {...textHeadingStyle} {...headingStyle}>{heroData.wordpressPage.title}</Heading>}
                            {desc && <Text {...textHeadingStyle} {...textStyle}>Блог о лотореях</Text>}
                        </HeroTextBox>
                    </Col>
                </Row>
            </Container>
        </HeroWrapper>
    )
}

HeroArea.propTypes = {
    headingStyle: PropTypes.object,
    textStyle: PropTypes.object,
    textHeadingStyle: PropTypes.object
}

HeroArea.defaultProps = {
    headingStyle: {
        as: 'h1',
        fontSize: ['70px', null, '90px', '110px', '130px', null, '150px'],
        textTransform: 'capitalize',
        fontFamily: 'marck',
        mb: ['10px', null, 0]
    },
    textStyle: {
        fontSize: ['35px', '48px'],
        fontFamily: 'segoe'
    },
    textHeadingStyle: {
        color: '#fff',
        lineHeight: 1,
        fontWeight: 'regular'
    }
}

export default HeroArea
