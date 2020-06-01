import React from "react"
import Layout from "../containers/layout/layout"
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <div className="main-content">
    <h1>Вернись на главную!</h1>
    </div>
  </Layout>
)

export default SecondPage
