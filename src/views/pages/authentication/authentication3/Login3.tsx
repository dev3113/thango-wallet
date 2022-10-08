import { Link } from 'react-router-dom';

// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import useAuth from 'hooks/useAuth';
import color from 'themes/color';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    // const theme = useTheme();
    const { isLoggedIn } = useAuth();
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Typography variant="h2" sx={{ color: color.primary }}>
                                            SIGN IN
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container justifyContent="space-around" direction="row" xs={12}>
                                            <Grid
                                                container
                                                alignItems="center"
                                                justifyContent="end"
                                                item
                                                xs={5}
                                                sx={{ display: 'flex', gap: 1, textAlign: 'center' }}
                                            >
                                                <Typography
                                                    component={Link}
                                                    to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                    variant="subtitle1"
                                                    color={color.primary}
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Create account Sign Up
                                                </Typography>
                                            </Grid>
                                            <Grid xs={2} item direction="row" container alignItems="center" justifyContent="center">
                                                <Typography color={color.primary}>|</Typography>
                                            </Grid>
                                            <Grid item xs={5} container alignItems="center" justifyContent="start">
                                                <Typography
                                                    variant="subtitle1"
                                                    component={Link}
                                                    to="/forgot"
                                                    color={color.primary}
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Forgot Password?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid> */}
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
