import styled from "styled-components";
import {device} from '../../../theme'

export const ContactTitleWrap = styled.section `
    padding-top: 25px;
    padding-bottom: 42px;
    ${device.small}{
        padding-top: 25px;
    }
    ${device.medium}{
        padding-top: 45px;
    }
`;