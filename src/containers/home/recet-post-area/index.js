import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import SectionTitle from '../../../components/shared/section-title'
import Blog from '../../../components/blog/layout-two'
import Pagination from '../../../components/pagination'
import {RecenPostWrap, RecentPostContent} from './react-post-area.stc'
import {truncateString} from '../../../utils/utilFunctions'
const RecentPostArea = (props) => {
    const blogData = useStaticQuery(graphql `
        query RecentPostQuery {
            allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, limit: 6) {
                totalCount
                edges {
                    node {
                        fields {
                            slug
                            dateSlug
                            postID
                        }
                        frontmatter {
                            category
                            date(formatString: "LL")
                            format
                            tags
                            title
                            video_link
                            quote_text
                            quote_author
                            link
                            image {
                                childImageSharp {
                                    fluid(maxWidth: 510, maxHeight: 350, quality: 100, srcSetBreakpoints: 6) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                            images {
                                childImageSharp {
                                    fluid(maxWidth: 510, maxHeight: 350, quality: 100, srcSetBreakpoints: 6) {
                                        ...GatsbyImageSharpFluid_withWebp
                                        presentationWidth
                                        presentationHeight
                                    }
                                }
                            }
                        }
                        excerpt(pruneLength: 165, format: PLAIN, truncate: true)
                    }
                }
            }
            allWordpressPost(limit:8){
                totalCount
                edges {
                  node {
                    id
                    slug
                    status
                    template
                    format
                    title
                    date(formatString: "YYYY-MM-DD")
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
    `);
    const blogs = blogData.allWordpressPost.edges;
    // const test = blogData.allWordpressPost.edges.map((t) => console.tabl(t.node.slug))
    const {sectionTitleStyle, blogStyle} = props;
    const {totalCount} = blogData.allWordpressPost;
    const postsPerPage = 8;
    const numberOfPages = Math.ceil(totalCount/postsPerPage);
    return (
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
                currentPage={1}
                numberOfPages={numberOfPages}
            />
        </RecenPostWrap>
    )
}

RecentPostArea.propTypes = {
    sectionTitleStyle: PropTypes.object,
    blogStyle: PropTypes.object
}

RecentPostArea.defaultProps = {
    sectionTitleStyle: {
        mb: '46px'
    },
    blogStyle: {
        mb: '50px'
    }
}

export default RecentPostArea
