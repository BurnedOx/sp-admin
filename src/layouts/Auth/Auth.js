import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';

import { Alert } from 'components';
import { Topbar } from './components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { gotSessionError } from 'actions';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = props => {
  const { route, user, error, handleError } = props;

  const classes = useStyles();

  if (user)
    return <Redirect to="/" />;

  return (
    <Fragment>
      <Topbar />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert variant="error" message={error} onClose={handleError} />
        </Snackbar>
      </main>
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.session.user,
  error: state.session.error
});

const mapDispatchToProps = dispatch => ({
  handleError: () => dispatch(gotSessionError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
