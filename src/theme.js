import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';


const theme = createMuiTheme({
  props: {
    
      MuiTypography: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  palette: {
    primary: pink,
  },

});

export default theme;