import styled from "styled-components";
import BackgroundImage from 'gatsby-background-image'
import { themeGet } from '@styled-system/theme-get';
import { device } from '../../../theme'

export const ContactWrapper = styled.section`
    padding-bottom: 60px;
    ${device.small}{
        padding-bottom: 80px;
    }
    ${device.medium}{
        padding-bottom: 100px;
    }
`;

export const MailChimpText = styled.div`
    margin-bottom: 36px;
    ${device.small}{
        margin-bottom: 46px;
    }
    ${device.medium}{
        margin-bottom: 69px;
        padding-top: 22px;
    }
`;


export const CtaWrapper = styled.div`
    position: relative;
    margin-top: 60px;
    ${device.medium}{
        margin-top: 0;
    }
    &:after{
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        border-radius: 6px;
        background-image: -moz-linear-gradient( 45deg, rgb(248,119,124) 0%, rgba(248,119,124,0) 100%);
        background-image: -webkit-linear-gradient( 45deg, rgb(248,119,124) 0%, rgba(248,119,124,0) 100%);
        background-image: -ms-linear-gradient( 45deg, rgb(248,119,124) 0%, rgba(248,119,124,0) 100%);
    }
`;

export const CtaBG = styled(BackgroundImage)`
    position: absolute !important;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &:before,
    &:after{
        border-radius: 6px;
    }
`;

export const CtaContent = styled.div`
    position: relative;
    z-index: 2;
    color: #fff;
    padding-left: 30px;
    padding-top: 50px;
    padding-bottom: 30px;
    padding-right: 30px;
    ${device.small}{
        padding-left: 40px;
        padding-top: 80px;
        padding-bottom: 50px;
    }
    ${device.large}{
        padding-left: 78px;
        padding-top: 136px;
        padding-bottom: 70px;
    }
    .cta-heading{
        span{
            display: block;
            font-family: ${themeGet('fonts.marck')};
            font-size: 50px;
            margin-top: 13px;
            ${device.small}{
                font-size: 60px;
            }
        }
    }
`;