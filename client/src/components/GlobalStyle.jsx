import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.grey};
  }
`;

export default GlobalStyle;
