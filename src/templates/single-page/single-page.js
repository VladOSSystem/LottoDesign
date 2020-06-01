import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from "../../components/seo"
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import SearchWidget from '../../containers/widgets/search'
import RecentPostWidget from '../../containers/widgets/recent-post'
import CTAWidget from '../../containers/widgets/cta'
import HeroArea from './index'
import {
    SinglePostArea,
    SinglePostWrap,
    SidebarWrap
} from './single-page.stc'
import InstagramWrap from '../../containers/global/instagram'

const SingleBlog = ({ data, pageContext, location, ...restProps }) => {
    const {
         title, content
    } = data.wordpressPage;
    // console.log(featured_media)
    

    return (
        <Layout>
            <SEO title={title} />
            <Header />
            <HeroArea mainInfo={data}/>
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
            <Footer />
        </Layout>
    )
}

export const postQuery = graphql`
    query($slug: String!){
        wordpressPage(slug: { eq: $slug }) {
            title
            content
            slug 
            id
            date(formatString: "YYYY-MM-DD")
            featured_media {
                localFile {
                  childImageSharp {
                    fixed(width:1920, height:1080) {
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
        site {
            id
            
        }
    }
`;


export default SingleBlog
