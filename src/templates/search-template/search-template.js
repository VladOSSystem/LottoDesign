import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import SEO from "../../components/seo"
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import Text from '../../components/shared/text'
import Heading from '../../components/shared/heading'
import Blog from '../../components/blog/layout-two'
import SearchWidget from '../../containers/widgets/search'
import RecentPostWidget from '../../containers/widgets/recent-post'
import CTAWidget from '../../containers/widgets/cta'
import InstagramArea from '../../containers/global/instagram'
import {truncateString} from '../../utils/utilFunctions'
import { SectionWrap, PageHeader, BlogListWrap, SidebarWrap } from './search-template.stc'

const SearchTemplate = ({ data, pageContext, location, ...restProps }) => {
    const blogs = data.allWordpressPost.edges || [];
    const { headingCSS, textCSS, blogStyle } = restProps
    const { state } = location;
    const query = state && state.query
    let filteredBlogs = [];
    filteredBlogs = query && blogs.filter(post => {
        const title = post.node.title
        const html  = post.node.excerpt
        return (
            (title && title.toLowerCase().includes(query)) ||
            (html && html.toLowerCase().includes(query)) 
           
        )
    })
    return (
        <Layout>
            <SEO title={`Search For: ${query ? query : ''}`} />
            <Header />
            <div className="main-content">
                <SectionWrap>
                    <Container>
                        <Row>
                            <Col xl={8}>
                                <PageHeader>
                                    <Text {...textCSS}>Результаты поиска для "{query}"</Text>
                                    <Heading {...headingCSS}>Постов найдено: {filteredBlogs ? filteredBlogs.length : 0}</Heading>
                                </PageHeader>
                                <BlogListWrap>
                                    {filteredBlogs && filteredBlogs.map(blog => (
                                        <Blog
                                            {...blogStyle}
                                            key={blog.node.slug}
                                            content={{
                                                excerpt: truncateString(blog.node.excerpt, 50),
                                                ...blog.node
                                            }}
                                        />
                                    ))} 
                                </BlogListWrap>
                            </Col>
                            <Col xl={4}>
                                <SidebarWrap>
                                    <SearchWidget />
                                    <RecentPostWidget />
                                    <CTAWidget />
                                </SidebarWrap>
                            </Col>
                        </Row>
                    </Container>
                </SectionWrap>
                <InstagramArea />
            </div>
            <Footer />
        </Layout>
    )
}

export const query = graphql`
    query BlogBySearchQuery{
        allWordpressPost{
            totalCount
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

SearchTemplate.defaultProps = {
    textCSS: {
        mb: '11px',
        mt: '-4px'
    },
    headingCSS: {
        as: 'h4',
        color: 'secondaryColor'
    },
    blogStyle: {
        mb: '30px'
    }
}

export default SearchTemplate
