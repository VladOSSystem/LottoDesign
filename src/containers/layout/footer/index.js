import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useStaticQuery, graphql } from "gatsby"
import List, { ListItem } from '../../../components/shared/list'
import Anchor from '../../../components/shared/anchor'
import Social from '../../../components/socials/layout-one'
import {
    FooterWrap,
    FooterTop,
    FooterBottom,
    FooterWidget,

} from './footer.stc'

const Footer = (props) => {
    const FooterData = useStaticQuery(graphql`
        query FooterDataQuery {
            site {
                siteMetadata {
                    contact {
                        social {
                            facebook
                            instagram
                            linkedin
                            twitter
                            youtube
                        }
                    }
                }
            }
            allWordpressMenusMenusItems {
                edges {
                  node {
                    id
                    name
                    slug
                    items {
                      slug
                      title
                      child_items {
                        slug
                        title
                      }
                      title
                    }
                  }
                }
              }
        }      
    `)
    const { social } = FooterData.site.siteMetadata.contact;
    const {
        footerMenuOne,
        socialStyle,
        widgetStyle: { socialWidget } } = props
    return (
        <FooterWrap>
            <Container>
                <FooterTop>
                    <Row style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
                        <Col md={2} lg={2}>
                        <h4>lottojackpot.ru</h4>
                        </Col>
                        <Col md={{ size: 10 }} lg={{ size: 10 }}>
                        
                            <FooterWidget  >
                                <List {...footerMenuOne} style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',flexWrap:'wrap',textAlign: 'right'}}>
                                {FooterData.allWordpressMenusMenusItems.edges[0].node.items.map((m)=>{
                                    return (
                                        <React.Fragment key={m.slug}>
                                        {m.slug !== 'lottojackpot.ru' ?  (<ListItem ><Anchor path={`/page/${m.slug}`}>{m.title}</Anchor></ListItem>):( <ListItem ><Anchor path={`/`}>{m.title}</Anchor></ListItem>)}
                                        </React.Fragment>
                                    )
                                })}
                                   
                                </List>
                            </FooterWidget>
                        </Col>
                
                    </Row>
                </FooterTop>
                <FooterBottom>
                    <Row className="align-items-end">
                        <Col md={3} xl={3}>
                            <FooterWidget {...socialWidget}>
                                <Social social={social} {...socialStyle} />
                            </FooterWidget>
                        </Col>
                    
                    </Row>
                </FooterBottom>
            </Container>
        </FooterWrap>
    )
}

Footer.defaultProps = {
    footerMenuOne: {
        color: '#000000',
        pb: '14px',
        textTransform: 'uppercase',
        fontWeight: 500
    },
    widgetStyle: {
        logoWidget: {
            mb: ['33px', null, null, 0]
        },
        menuOneWidget: {
            mb: ['29px', null, null, 0]
        },
        socialWidget: {
            mb: ['34px', null, null, 0]
        },
        menuTwoWidget: {
            mb: ['35px', null, null, 0]
        }
    },
    address: {
        addressAnchor: {
            textTransform: 'uppercase',
            display: 'block',
            color: '#000000',
            fontWeight: 500,
            mb: '13px'
        },
        addressText: {
            fontWeight: 400,
            lineHeight: 2,
            mt: ['20px', null, null, null, '40px'],
            color: '#000000',
        }
    },
    socialStyle: {
        pr: ['15px', null, null, '12px', '15px', '20px'],
        icon: {
            width: '18px',
            height: '18px'
        }
    },
    footerMenuTwo: {
        color: '#000000',
        pb: '14px',
        fontWeight: 400
    },
    copyright: {
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: 'borderColor',
        pt: '25px'
    }
}

export default Footer
