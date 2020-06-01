import React from "react"
import SEO from '../../components/seo'
import Layout from "../../containers/layout/layout"
import Header from '../../containers/layout/header'
import Footer from '../../containers/layout/footer'
import FeaurePostArea from '../../containers/home/feature-post-area'
import MainArea from '../../containers/home/main-area'

const IndexPage = () => (
  <Layout>
    <SEO title="news" />
    <Header/>
    <div className="main-content">
      <FeaurePostArea/>
      <MainArea/>
    </div>
    <Footer/>
  </Layout>
)

export default IndexPage
