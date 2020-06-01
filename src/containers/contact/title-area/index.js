import React from 'react'
import {ContactTitleWrap} from './title-area.stc'

const TitleArea = ({titleCSS, taglineCSS}) => {
    
    return (
        <ContactTitleWrap>
           
        </ContactTitleWrap>
    )
}

TitleArea.defaultProps = {
    titleCSS: {
        as: "h5",
        fontSize: [1],
        textTransform: "capitalize",
        mb: "17px"
    },
    taglineCSS: {
        color: "secondaryColor",
        fontSize: [4, 5],
        fontWeight: "bold",
        lineHeight: [1.4, 1.375]
    }
}

export default TitleArea
