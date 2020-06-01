import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image'
import {device} from '../../../theme'


export const HeroWrapper = styled.section `
    height: 500px;
    position: relative;
    ${device.small}{
        height: 600px;
    }
    ${device.xlarge}{
        height: 750px;
    }
    &:before{
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgb( 0, 0, 0, .2 );
    }
`;

export const HeroBG = styled(BackgroundImage) `
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

export const HeroTextBox = styled.div `
    padding-top: 170px;
    ${device.small}{
        padding-top: 200px;
    }
    ${device.xlarge}{
        padding-top: 268px;
    }
    * {
        position: relative;
        z-index: 9;
    }
`; 