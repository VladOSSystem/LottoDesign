import styled from "styled-components";
import {themeGet} from '@styled-system/theme-get'
import {device} from '../../../theme'

export const FeaturePostWrapper = styled.div `
    padding-top: 60px;
    padding-bottom: 50px;
    .feature-post-slider{
        padding-bottom: 45px;
        border-bottom: 1px solid ${themeGet("colors.borderColor")};
    }
    ${device.small}{
        padding-bottom: 50px;
        padding-top: 80px;
    }
    ${device.medium}{
        padding-top: 100px;
        padding-bottom: 50px;
    }
`; 