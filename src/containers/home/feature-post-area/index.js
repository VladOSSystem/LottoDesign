import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Blog from '../../../components/blog/layout-one'
import Swiper from '../../../components/shared/swiper'
import {truncateString} from '../../../utils/utilFunctions'
import {FeaturePostWrapper} from './feature-post-area.stc'

const FeaturePostArea = (props) => {
    const featurePostData = useStaticQuery(graphql `
        query FeaturePostQuery {
            allWordpressPost( limit: 6) {
                edges {
                  node {
                    id
                    slug
                    status
                    template
                    format
                    title
                    date
                    featured_media {
                      localFile {
                        childImageSharp {
                          fixed(width: 350, height: 400) {
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
              }
        }
    `)
    const blogs = featurePostData.allWordpressPost.edges;
    const {sliderSettings, sliderStyle} = props
    // console.log(featurePostData)
    // console.log(featurePostData.allWordpressPost.edges[2].node)
    return (
        <FeaturePostWrapper id="feature-post">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="feature-post-slider">
                            <Swiper {...sliderStyle} settings={sliderSettings}>
                                {blogs.map(blog => (
                                    <div className="item" key={blog.node.slug}>
                                        <Blog
                                            content={{
                                                title: truncateString(blog.node.title, 50),
                                                configObj: blog.node
                                            }}
                                        />
                                    </div>
                                ))}
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </FeaturePostWrapper>
    )
}

FeaturePostArea.defaultProps = {
    sliderSettings: {
        slidesPerView: 1,
        spaceBetween: 30,
        arrows: false,
        customArrows: true,
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1
            }
        }
    },
    sliderStyle: {
        navStyle: 2
    }
}

export default FeaturePostArea
