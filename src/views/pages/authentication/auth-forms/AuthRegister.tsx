import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tab,
    Tabs,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from 'types';
import Facebook from 'assets/images/icons/social-facebook.svg';
import Google from 'assets/images/icons/social-google.svg';
import color from 'themes/color';
import countries from 'utils/country';
import _ from 'lodash';

// ===========================|| FIREBASE - REGISTER ||=========================== //

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [valueTab, setValueTab] = React.useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };

    const [valueAutoComplete, setValueAutoComplete] = React.useState(countries[238]);
    const [flag, setFlag] = React.useState(countries[238].code);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { firebaseRegister, firebaseGoogleSignIn } = useAuth();

    const googleHandler = async () => {
        try {
            await firebaseGoogleSignIn();
        } catch (err) {
            console.error(err);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid item xs={12} container alignItems="center" justifyContent="center">
                <Box sx={{ mb: 2 }}>
                    <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
                        <Tab
                            label="Email"
                            {...a11yProps(0)}
                            sx={{
                                color: color.grayDark,
                                '&.Mui-selected': {
                                    color: color.primary,
                                    borderBottom: color.primary
                                }
                            }}
                        />
                        <Divider orientation="vertical" flexItem />
                        <Tab
                            label="Mobile"
                            {...a11yProps(1)}
                            sx={{
                                color: color.grayDark,
                                '&.Mui-selected': {
                                    color: color.primary,
                                    borderBottom: `${color.primary} !important`
                                }
                            }}
                        />
                    </Tabs>
                </Box>
            </Grid>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await firebaseRegister(values.email, values.password).then(
                            () => {
                                // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                                // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                                // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                                // github issue: https://github.com/formium/formik/issues/2430
                            },
                            (err: any) => {
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }
                        );
                    } catch (err: any) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {/* <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-email-login"
                                        sx={{
                                            top: '17px !important',
                                            left: '37px !important',
                                            '&.Mui-focused': {
                                                color: color.primary
                                            }
                                        }}
                                    >
                                        First Name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        // value={values.first}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ex. John"
                                        label="Email or Phone Number"
                                        startAdornment={<PersonIcon sx={{ color: color.primary }} />}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-email-login"
                                        sx={{
                                            top: '17px !important',
                                            left: '37px !important',
                                            '&.Mui-focused': {
                                                color: color.primary
                                            }
                                        }}
                                    >
                                        Last name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        // value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ex. Ricmod"
                                        label="Last Name"
                                        startAdornment={<PersonIcon sx={{ color: color.primary }} />}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid> */}
                        {valueTab === 0 ? (
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel
                                    htmlFor="outlined-adornment-email-register"
                                    sx={{
                                        top: '17px !important',
                                        left: '37px !important',
                                        '&.Mui-focused': {
                                            color: color.primary
                                        }
                                    }}
                                >
                                    Email Address
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-register"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                    startAdornment={<EmailOutlinedIcon sx={{ color: color.primary }} />}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        ) : (
                            <Grid container alignItems="center" spacing={3}>
                                <Grid item xs={12} sm={5}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            value={valueAutoComplete}
                                            id="country-select-demo"
                                            sx={{
                                                '& .MuiAutocomplete-input': {
                                                    padding: '11px  !important'
                                                }
                                            }}
                                            options={countries}
                                            autoHighlight
                                            onChange={(event: any, newValue: string | null | any) => {
                                                setFieldValue('country_code', newValue?.phone);
                                                setFlag(newValue?.label);
                                                setValueAutoComplete(newValue);
                                            }}
                                            isOptionEqualToValue={(option, value) => !value || value?.phone === option?.phone}
                                            onBlur={handleBlur}
                                            getOptionLabel={(option) => `${option.code} +${option.phone}`}
                                            renderOption={(props, option) => (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                        alt=""
                                                    />
                                                    {option.label} ({option.code}) +{option.phone}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="country_code"
                                                    variant="outlined"
                                                    label=""
                                                    onChange={handleChange}
                                                    // InputProps={{
                                                    //     startAdornment: (
                                                    //         <Box>
                                                    //             <img
                                                    //                 width="20"
                                                    //                 height="20"
                                                    //                 src={`https://flagcdn.com/w20/${_.lowerCase(flag)}.png`}
                                                    //                 alt=""
                                                    //             />
                                                    //         </Box>
                                                    //     )
                                                    // }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel
                                            htmlFor="outlined-adornment-email-register"
                                            sx={{
                                                top: '17px !important',
                                                left: '37px !important',
                                                '&.Mui-focused': {
                                                    color: color.primary
                                                }
                                            }}
                                        >
                                            Mobile No
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-email-register"
                                            type="email"
                                            name="Mobile No"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                            startAdornment={<PhoneIphoneIcon sx={{ color: color.primary }} />}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password-register"
                                sx={{
                                    top: '17px !important',
                                    left: '37px !important',
                                    '&.Mui-focused': {
                                        color: color.primary
                                    }
                                }}
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                // label="Password"
                                placeholder="Min 6 character"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                startAdornment={<EmailOutlinedIcon sx={{ color: color.primary }} />}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password-register"
                                sx={{
                                    top: '17px !important',
                                    left: '37px !important',
                                    '&.Mui-focused': {
                                        color: color.primary
                                    }
                                }}
                            >
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                placeholder="Min 6 character"
                                name="password"
                                // label="Confirm Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                startAdornment={<EmailOutlinedIcon sx={{ color: color.primary }} />}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            sx={{
                                                color: color.primary,
                                                '&.Mui-checked': {
                                                    color: color.primary
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: color.primary,
                                        '&:hover': {
                                            background: color.primary
                                        }
                                    }}
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
            <Grid item xs={12}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                    <Button
                        variant="outlined"
                        sx={{
                            cursor: 'unset',
                            m: 2,
                            py: 0.5,
                            px: 7,
                            borderColor:
                                theme.palette.mode === 'dark'
                                    ? `${theme.palette.dark.light + 20} !important`
                                    : `${theme.palette.grey[100]} !important`,
                            color: `${theme.palette.grey[900]}!important`,
                            fontWeight: 500,
                            borderRadius: `${borderRadius}px`
                        }}
                        disableRipple
                        disabled
                    >
                        OR
                    </Button>

                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                </Box>
            </Grid>
            <Grid container spacing={2} sx={{ mt: '0.5' }}>
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            variant="contained"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                ':hover': {
                                    outline: 'none !important',
                                    border: 'none !important',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                                }
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Google
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={6}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            variant="contained"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                ':hover': {
                                    outline: 'none !important',
                                    border: 'none !important',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                                }
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Facebook} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Facebook
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    );
};

export default FirebaseRegister;
