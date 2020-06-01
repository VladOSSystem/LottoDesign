import React from 'react'
import PropTypes from 'prop-types'
import Anchor from '../shared/anchor'
import {LogoWrap} from './logo.stc'
import { useStaticQuery, graphql } from "gatsby"
const Logo = props => {
    const HeaderData = useStaticQuery(graphql `
        {
            allWordpressSiteMetadata {
                edges {
                node {
                    description
                    name
                }
                }
            }
        }   
       
`)
    return (
        <LogoWrap {...props}>
            <Anchor path="/">
                <h4 className="black-logo">{HeaderData.allWordpressSiteMetadata.edges[0].node.name}</h4>
            </Anchor>
        </LogoWrap>
    )
}

Logo.propTypes = {
    transparentBG: PropTypes.bool
}

export default Logo
