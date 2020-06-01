import React from 'react'
import PropTypes from 'prop-types'
import {useStaticQuery, graphql} from 'gatsby'
import {Container, Row, Col} from 'reactstrap'
import { FiChevronRight } from "react-icons/fi";
import parse from 'html-react-parser'
import SectionTitle from '../../../components/shared/section-title'
import Text from '../../../components/shared/text'
import Heading from '../../../components/shared/heading'
import Button from '../../../components/shared/button'
import Mailchimp from '../../../components/forms/mailchimp'

import {ContactWrapper, CtaWrapper, MailChimpText, CtaBG, CtaContent} from './contact-area.stc'

const ContactArea = (props) => {
    const ContactData = useStaticQuery(graphql `
        query ContactDataQuery {
            mailchimp: homeJson(id: {eq: "home-mailchimp-content"}) {
                title
                desc
            }
            cta: homeJson(id: {eq: "home-cta-content"}) {
                title
                desc
                path
                image {
                    childImageSharp {
                        fluid(maxWidth: 723, maxHeight: 640, srcSetBreakpoints: 6, quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                            presentationHeight
                            presentationWidth
                        }
                    }
                }
            }
        }      
    `);

    const mailchimp = ContactData.mailchimp;
    const cta = ContactData.cta;
    const ctaBg = cta.image.childImageSharp.fluid;
    const {sectionTitleStyle, textStyle, ctaHeading, ctaText, ctaBtn} = props;
    return (
        <ContactWrapper>
            <Container>
                <Row>
                    <Col lg={4}>
                        <MailChimpText>
                            {mailchimp.title && <SectionTitle {...sectionTitleStyle} title={mailchimp.title}/>}
                            {mailchimp.desc && <Text {...textStyle}>{mailchimp.desc}</Text>}
                        </MailChimpText>
                        <Mailchimp/>
                    </Col>
                    <Col lg={{size: 7, offset: 1}}>
                        <CtaWrapper>
                            <CtaBG fluid={ctaBg}/>
                            <CtaContent>
                                {cta.title && <Heading {...ctaHeading} className="cta-heading">{parse(cta.title)}</Heading>}
                                {cta.desc && <Text {...ctaText}>{cta.desc}</Text>}
                                {cta.path && <Button {...ctaBtn} to={cta.path} icon={<FiChevronRight/>}>Connect With me</Button>}
                            </CtaContent>
                        </CtaWrapper>
                    </Col>
                </Row>
            </Container>
        </ContactWrapper>
    )
}

ContactArea.propTypes = {
    sectionTitleStyle: PropTypes.object,
    textStyle: PropTypes.object,
}

ContactArea.defaultProps = {
    sectionTitleStyle: {
        mb: '31px'
    },
    textStyle: {
        fontSize: '16px',
        fontWeight: 300,
        color: 'headingColor'
    },
    ctaHeading: {
        as: 'h3',
        color: '#fff',
        fontSize: '24px',
        lineHeight: 1,
        letterSpacing: '3px',
        fontWeight: 300,
        mb: '30px'
    },
    ctaText: {
        maxWidth: '365px',
        fontSize: '16px',
        fontWeight: 300,
        pb: ['55px', '70px', null, null, null, '120px']
    },
    ctaBtn: {
        colors: "light",
        fontWeight: 500,
        shape: 'rounded',
        btnsize: 'large'
    }
}

export default ContactArea