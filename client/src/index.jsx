import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core/';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: { main: "#457b9dff" },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
    MuiTextField: {
      autoCapitalize: 'off',
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: false,
      variant: "filled",
      fullWidth: true,
      InputLabelProps: { shrink: true }
    }
  },
  overrides: {
    MuiButton: {
      root: { padding: "10px 25px", boxSizing: "border-box" },
      fullWidth: { height: 56, padding: "18.5px 14px", marginBottom: 40 },
      text: { textTransform: "none" }
    },
    MuiTextField: { root: { marginBottom: 10 } }
  }
});


const Home = React.lazy(() => import('./routes/home'));
const SignIn = React.lazy(() => import('./routes/signin'));
const SignUp = React.lazy(() => import('./routes/signup'));
const Activate = React.lazy(() => import('./routes/activate'));
const Activated = React.lazy(() => import('./routes/activated'));
const TiresForm = React.lazy(() => import('./routes/tiresform'));
const TiresList = React.lazy(() => import('./routes/tires'));

ReactDOM.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/signin" >
            <SignIn />
          </Route>
          <Route exact path="/signup" >
            <SignUp />
          </Route>
          <Route exact path="/activate" >
            <Activate />
          </Route>
          <Route exact path="/activate/:token" >
            <Activated />
          </Route>
          <Route exact path="/tiresform" >
            <TiresForm />
          </Route>
          <Route exact path="/tires" >
            <TiresList />
          </Route>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);