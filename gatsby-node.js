const path = require(`path`)
const { slugify } = require('./src/utils/utilFunctions')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title);
        const date = node.frontmatter.date;
        const dateSplit = date.split(" ");
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        });
        createNodeField({
            node,
            name: 'postID',
            value: slugFromTitle + '-' + dateSplit[0]
        });
        createNodeField({
            node,
            name: "dateSlug",
            value: dateSplit[0]
        });
        if (Object.prototype.hasOwnProperty.call(node.frontmatter, "author")) {
            createNodeField({
                node,
                name: "authorId",
                value: slugify(node.frontmatter.author)
            });
        }
    }
    if (node.internal.type === 'AuthorsJson') {
        createNodeField({
            node,
            name: "authorId",
            value: slugify(node.name)
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const singleBlogPage = path.resolve("./src/templates/single-blog/single-blog.js")
    const blogList = path.resolve("./src/templates/blog-list/blog-list.js");
    const singlePage = path.resolve("./src/templates/single-page/single-page.js")
    const searchPage = path.resolve("./src/templates/search-template/search-template.js");
    const newsTemplate = path.resolve("./src/templates/news-template/index.js");


    const result = await graphql(`
        {
    allWordpressPost {
        edges { 
        node {
            id
            slug
            status
            template
            format
            title
            date(formatString: "YYYY-MM-DD")
            featured_media {
            localFile {
                childImageSharp {
                fixed(width: 450, height: 500) {
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
       allWordpressPage {
        edges {
            node {
                id
                slug
                status
                template
            }
          }
        }  
      }
    `);
    // News template 
    createPage({
        path: `/page/news`,
        component: newsTemplate,
        context: {

        }
    })

    // Create Single Page
    const pages = result.data.allWordpressPage.edges;
    pages.forEach(({node}) => {
        createPage({
            path: `/page/${node.slug}`,
            component: singlePage,
            context: {
                slug: node.slug
            }
        })
    })
    // Create Single Blog Page
    const posts = result.data.allWordpressPost.edges;
    posts.forEach(({ node }) => {
        createPage({
            path: `/post/${node.slug}`,
            component: singleBlogPage,
            context: {
                slug: node.slug
            }
        })
    });

    // Create Blog List Page
    // Pagination

    const postsPerPage = 8;
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages }).forEach((_, index) => {
        const isFirstPage = index === 0;
        const currentPage = index + 1;
        if (isFirstPage) return;
        createPage({
            path: `page/${currentPage}`,
            component: blogList,
            context: {
                limit: postsPerPage,
                skip: index * postsPerPage,
                currentPage,
                numberOfPages
            }
        })
    })


    // Create Search Page
    createPage({
        path: '/search',
        component: searchPage,
    })
}