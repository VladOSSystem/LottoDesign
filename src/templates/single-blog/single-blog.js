import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from "../../components/seo"
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import { Thumbnail } from '../../components/blog/blog-media'

import SearchWidget from '../../containers/widgets/search'
import RecentPostWidget from '../../containers/widgets/recent-post'
import CTAWidget from '../../containers/widgets/cta'
import Comment from '../../containers/global/comment'
import InstagramWrap from '../../containers/global/instagram'
import {
    SinglePostArea,
    SinglePostWrap,
    PostMedia,
   
    SidebarWrap
} from './single-blog.stc'

const SingleBlog = ({ data, pageContext, location, ...restProps }) => {
    const { slug } = data.wordpressPost;
    const {
        title, 
        featured_media,
         content
    } = data.wordpressPost;
    return (
        <Layout>
            <SEO title={title} />
            <Header />
            <div className="main-content">
                <SinglePostArea {...restProps}>
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <SinglePostWrap>
                                    <PostMedia>
                                            <Thumbnail path={`post/${slug}`} image={featured_media.localFile} title={title} />
                                    </PostMedia>
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
                                
                                </SinglePostWrap>
                                <Comment slug={slug} title={title} id={slug} />
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
        wordpressPost(slug: { eq: $slug }) {
            title
            content
            slug
            featured_media {
                localFile {
                  childImageSharp {
                    fixed(width:800, height:400) {
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
`;


export default SingleBlog
