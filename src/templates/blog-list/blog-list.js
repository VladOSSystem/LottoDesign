import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap'
import {graphql} from 'gatsby'
import SEO from '../../components/seo'
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import HeroArea from '../../containers/home/hero-area'
import FeaurePostArea from '../../containers/home/feature-post-area'
import ContactArea from '../../containers/home/contact-area'
import Siderbar from '../../containers/global/sidebar' 
import SectionTitle from '../../components/shared/section-title'
import Blog from '../../components/blog/layout-two'
import {truncateString} from '../../utils/utilFunctions'
import Pagination from '../../components/pagination'
import {MainWrapper, RecenPostWrap, RecentPostContent} from './blog-list.stc'

const BlogList = ({ data, pageContext, location, ...restProps }) => {
    console.log(data)
    const {sectionTitleStyle, blogStyle} = restProps;
    const blogs = data.allWordpressPost.edges;
    const {currentPage, numberOfPages} = pageContext;
    return (
        <Layout>
            <SEO title={`Blog Page: ${currentPage}`} />
            <Header transparent/>
            <div className="main-content">
                <HeroArea/>
                <FeaurePostArea/>
                <MainWrapper>
                    <Container>
                        <Row>
                            <Col lg={8}>
                            <RecenPostWrap>
                                <SectionTitle
                                    {...sectionTitleStyle}
                                    title="САМЫЕ ПОСЛЕДНИЕ ПОСТЫ"
                                />
                                <RecentPostContent>
                                    {blogs.map(blog => (
                                        <Blog
                                            {...blogStyle}
                                            key={blog.node.slug}
                                            content={{
                                                ...blog.node, 
                                                excerpt: truncateString(blog.node.excerpt, 50)
                                            }} 
                                        />
                                    ))}
                                </RecentPostContent>
                                <Pagination
                                    rootPage="/"
                                    currentPage={currentPage}
                                    numberOfPages={numberOfPages}
                                />
                            </RecenPostWrap>
                            </Col>
                            <Col lg={4}>
                                <Siderbar/>
                            </Col>
                        </Row>
                    </Container>
                </MainWrapper>
            </div>
            <Footer/>
        </Layout> 
    )
}
 
export const query = graphql `
    query BlogListQuery($skip: Int!, $limit: Int!){
       
        allWordpressPost(limit: $limit, skip: $skip) {
            edges {
              node {
                id
                slug
                status
                template
                format
                title
                date
                excerpt
                content
                featured_media {
                  localFile {
                    childImageSharp {
                      fixed(width: 510, height: 350) {
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
`;

BlogList.propTypes = {
    sectionTitleStyle: PropTypes.object,
    blogStyle: PropTypes.object
}

BlogList.defaultProps = {
    sectionTitleStyle: {
        mb: '46px'
    },
    blogStyle: {
        mb: '50px'
    }
}

export default BlogList
