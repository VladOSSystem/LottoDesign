import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from "../../components/seo"
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import BlogMeta, { CommentNumber, Category, Tags } from '../../components/blog/blog-meta'
import { Thumbnail, Video, Quote, Linked, Gallery } from '../../components/blog/blog-media'
import ModalVideo from '../../components/shared/modal-video'
import { slugify } from '../../utils/utilFunctions'
import SearchWidget from '../../containers/widgets/search'
import RecentPostWidget from '../../containers/widgets/recent-post'
import InstagramWidget from '../../containers/widgets/instagram'
import CategoryWidget from '../../containers/widgets/categories'
import AuthorWidget from '../../containers/widgets/author'
import CTAWidget from '../../containers/widgets/cta'
import SubscribeWidget from '../../containers/widgets/subscribe'
import InstagramArea from '../../containers/global/instagram'
import Comment from '../../containers/global/comment'
import RelatedPosts from '../../containers/global/related-posts'
import SocialShare from '../../components/socials/social-share'
import {
    SinglePostArea,
    SinglePostWrap,
    PostMedia,
    PostHeader,
    PostTitle,
    PostMeta,
    PostFooter,
    PostShare,
    PostTags,
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
    console.log(featurePageData)
    const { slug } = featurePageData.wordpressPage;
    const {
        date, format, title, image,
        video_link, quote_text, quote_author,
        link, images, tags, featured_media, content
    } = featurePageData.wordpressPage;
    // console.log(featured_media)
    const { html } = featurePageData.wordpressPage;
    let video_arr, video_id, video_channel;
    if (video_link) {
        video_arr = video_link.split('=', -1);
        video_id = video_arr[1];
        video_channel = video_link.split(".")[1];
    }
    const [videoOpen, setVideoOpen] = useState(false);
    const modalVideoOpen = () => {
        setVideoOpen(true)
    }
    const modalVideoClose = () => {
        setVideoOpen(false)
    }

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
