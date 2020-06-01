import React, {Fragment, useState, useEffect, useRef} from 'react';
import { Container } from 'reactstrap';
import { useStaticQuery, graphql } from "gatsby"
import Logo from '../../../components/logo'
import {MainMenu, MobileMenu}  from '../../../components/menu'
import Hamburger from '../../../components/shared/hamburger'
import Social from '../../../components/socials/layout-one'
import OffCanvas, {OffCanvasHeader, OffCanvasBody} from '../../../components/shared/off-canvas'
import {
    HeaderWrap, 
    HeaderOuter, 
    HeaderInner, 
    HeaderMain, 
    HeaderCol, 
    HeaderElement,
    FixedHeaderHeight,
    OffcanvasSocial
} from './header.stc'
 
const Header = (props) => {
    const HeaderData = useStaticQuery(graphql `
        query HeaderDataQuery {
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
    const {social} = HeaderData.site.siteMetadata.contact;
    const [fixedHeaderHeight, setFixedHeaderHeight] = useState(0);
    const [totalHeaderHeight, setTotalHeaderHeight] = useState(0);
    const [sticky, setSticky] = useState(false);
    const [offcanvasMenu, setOffcanvasMenu] = useState(false)
    const headerRef = useRef(null);
    const fixedRef = useRef(null);

    useEffect(() => {
        setFixedHeaderHeight(fixedRef.current.clientHeight);
        setTotalHeaderHeight(headerRef.current.clientHeight);
    }, []);
    
    useEffect(() => {
        const scrollHandler = () => {
            let scrollPos = window.scrollY;
            if(scrollPos > totalHeaderHeight){
                setSticky(true)
            }
            if(scrollPos < fixedHeaderHeight){
                setSticky(false)
            }
        }
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [sticky, fixedHeaderHeight, totalHeaderHeight]);
    
   

    const offcanvasMenuHandler = () => {
        setOffcanvasMenu(prev => !prev)
    }

    const { logoElStyle, hideInMobile, hideInPc, transparent} = props;
    return (
        <Fragment>
            <HeaderWrap transparent={transparent} ref={headerRef}>
                <HeaderOuter>
                    <HeaderInner transparent={transparent} ref={fixedRef} isSticky={sticky}>
                        <Container>
                            <HeaderMain>
                                <HeaderCol left>
                                    <HeaderElement {...logoElStyle}>
                                        <Logo transparentBG={transparent && !sticky}/>
                                    </HeaderElement>
                                </HeaderCol>
                                <HeaderCol center>
                                    <HeaderElement {...hideInMobile}>
                                        <MainMenu whiteColor={transparent && !sticky} menuData={HeaderData.allWordpressMenusMenusItems.edges[0].node.items}/>
                                    </HeaderElement>
                                </HeaderCol>
                                <HeaderCol right>
                                 
                                    <HeaderElement {...hideInPc}>
                                        <Hamburger onClick={offcanvasMenuHandler} whiteColor={transparent && !sticky}/>
                                    </HeaderElement>
                                </HeaderCol>
                            </HeaderMain>
                        </Container>
                    </HeaderInner>
                    <FixedHeaderHeight height={fixedHeaderHeight}/>
                </HeaderOuter>
            </HeaderWrap>
            <OffCanvas isOpen={offcanvasMenu} onClick={offcanvasMenuHandler}>
                <OffCanvasHeader onClick={offcanvasMenuHandler}>
                    <Logo/>
                </OffCanvasHeader>
                <OffCanvasBody>
                    <MobileMenu menuData={HeaderData.allWordpressMenusMenusItems.edges[0].node.items}/>
                    <OffcanvasSocial>
                        <Social color="headingColor" social={social}/>
                    </OffcanvasSocial>
                </OffCanvasBody>
            </OffCanvas>
        </Fragment>
    )
}

Header.defaultProps = {
    hamburgerElStyle: {
        pr: '25px',
        display: 'flex'
    },
    logoElStyle: {
        pl: '28px'
    },
    hideInMobile: {
        display: ['none', null, null, null, 'block']
    },
    hideInPc: {
        display: ['block', null, null, null, 'none']
    }
}

export default Header;