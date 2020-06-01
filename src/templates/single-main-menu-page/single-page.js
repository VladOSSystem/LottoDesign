import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from "../../components/seo"
import Layout from "../../containers/layout/layout"
import SearchWidget from '../../containers/widgets/search'
import RecentPostWidget from '../../containers/widgets/recent-post'
import CTAWidget from '../../containers/widgets/cta'
import {
    SinglePostArea,
    SinglePostWrap,
    SidebarWrap
} from './single-page.stc'
import InstagramWrap from '../../containers/global/instagram'

const SingleBlog = ({ location, ...restProps }) => {
    const featurePageData = useStaticQuery(graphql `
    query{  
        wordpressPage(path: {eq: "/"}) {
            id
            title
            content
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width:1920, height:1080) {
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
    const {
        title, 
        content
    } = featurePageData.wordpressPage;
    

    return (
        <Layout>
            <SEO title={title} />
            <div className="main-content">
                <SinglePostArea {...restProps}>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <SinglePostWrap>
                                    
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
                                
                                </SinglePostWrap>
                            </Col>
                            <Col lg={4}>
                                <SidebarWrap>
                                   <SearchWidget />
                                    <RecentPostWidget />
                                    <CTAWidget />
                                </SidebarWrap>
                            </Col>
                        </Row>
                    </Container>
                </SinglePostArea>
                <InstagramWrap/>
            </div>
        </Layout>
    )
}


export default SingleBlog
