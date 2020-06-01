import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import WidgetBox, {WidgetTitle} from '../../../components/shared/widget-box'
import Blog from '../../../components/blog/layout-three'
import {RecentPostWrap, RecentPostItem} from './recent-post.stc'
import {truncateString} from '../../../utils/utilFunctions'

const RecentPost = () => {
    const blogData = useStaticQuery(graphql `
        query RecentPostWidgetQuery {
            allMarkdownRemark(
                filter: {frontmatter: {format: {eq: "image"}}}, 
                sort: {order: DESC, fields: frontmatter___date}, limit: 4) {
                edges {
                    node {
                        fields {
                            slug
                            dateSlug
                        }
                        frontmatter {
                            date(formatString: "ll")
                            title
                            format
                            image {
                                childImageSharp {
                                    fixed(width: 78, height: 76, quality: 100) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
                          fixed(width: 78, height: 76) {
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
    return (
        <WidgetBox>
            <WidgetTitle>Последние посты</WidgetTitle>
            <RecentPostWrap>
                {blogs.map(blog => (
                    <RecentPostItem key={blog.node.slug}>
                        <Blog
                            content={{
                                ...blog.node.fields, 
                                ...blog.node.frontmatter,
                                configObj: blog.node,
                                title: truncateString(blog.node.title, 25)
                            }}
                        />
                    </RecentPostItem>
                ))}
            </RecentPostWrap>
        </WidgetBox>
    )
}
 
export default RecentPost;
