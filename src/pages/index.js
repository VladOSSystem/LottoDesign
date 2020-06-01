import React from "react"
import SEO from '../components/seo'
import Layout from "../containers/layout/layout"
import Header from '../containers/layout/header'
import Footer from '../containers/layout/footer'
import HeroArea from '../containers/home/hero-area'
import FeaurePostArea from '../containers/home/feature-post-area'
import MainIndexArea from '../templates/single-main-menu-page/single-page'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header/>
    <div className="main-content">
      <HeroArea/>
      <FeaurePostArea/>
      <MainIndexArea/>
    </div>
    <Footer/>
  </Layout>
)

export default IndexPage
