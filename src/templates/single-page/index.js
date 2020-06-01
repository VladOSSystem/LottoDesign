import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap';
import Heading from '../../components/shared/heading'
import Text from '../../components/shared/text'
import {HeroWrapper, HeroBG, HeroTextBox} from './hero-area.stc'

const HeroArea = (props) => {
    
    // const {title, desc, image} = heroData.homeJson;
    const {headingStyle, textStyle, textHeadingStyle} = props;
    return (
        <HeroWrapper>
        <HeroBG fluid={props.mainInfo.wordpressPage.featured_media.localFile.childImageSharp.fixed}/>
        <Container>
            <Row> 
                <Col lg={6}>
                    <HeroTextBox>
                        {props.mainInfo.wordpressPage && <Heading {...textHeadingStyle} {...headingStyle}>{props.mainInfo.wordpressPage.title}</Heading>}
                        { <Text {...textHeadingStyle} {...textStyle}>Блог о лотореях</Text>}
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
        fontSize: ['20px', null, '40px', '60px', '70px', null, '80px'],
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
