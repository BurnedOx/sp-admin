import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, match, ...rest } = props;

  const classes = useStyles();
  const { members } = useSelector(state => state.member);
  const user = members && members.find(u => u.id === match.params.id)

  const customer = {
    name: user && user.name
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        component="h2"
        gutterBottom
        variant="overline"
      >
        Customers
      </Typography>
      <Typography
        component="h1"
        variant="h3"
      >
        {customer.name}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default withRouter(Header);
