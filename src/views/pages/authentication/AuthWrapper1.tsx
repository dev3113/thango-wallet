// material-ui
import { styled } from '@mui/material/styles';
import color from 'themes/color';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light,
    backgroundColor: color.bgBlack,
    minHeight: '100vh'
}));

export default AuthWrapper1;
