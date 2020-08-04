import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { CustomerInfo, Invoices, SendEmails, OtherActions } from './components';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import BankInfo from './components/BankInfo';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Summary = props => {
  const { className, match, ...rest } = props;

  const { id } = match.params;
  const classes = useStyles();
  const [customer, setCustomer] = useState();
  const [user, setUser] = useState();
  const { members } = useSelector(state => state.member);

  console.log(user)

  useEffect(() => {
    let mounted = true;

    const fetchCustomer = () => {
      axios.get(`accounts/details/${id}`).then(response => {
        if (mounted) {
          setCustomer(response.data);
        }
      });

      const user = members && members.find(u => u.id === id);
      if (mounted) {
        if (!user) {
          axios.get(`accounts/users/${id}`).then(res => {
            setUser(res.data)
          }
          )
        } else {
          setUser(user);
        }
      }
    };

    fetchCustomer();

    return () => {
      mounted = false;
    };
  }, []);

  const updateMember = (state) => {
    setUser(s => ({ ...s, ...state }));
    axios.put(`/accounts/profile/${id}`, state)
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      {user && <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <CustomerInfo customer={user} onUpdate={updateMember} />
      </Grid>}
      {user && <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <BankInfo bankInfo={user.bankDetails} />
      </Grid>}
      {customer && <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Invoices customer={customer} />
      </Grid>}
      {/* <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <SendEmails customer={customer} />
      </Grid> */}
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <OtherActions />
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  className: PropTypes.string
};

export default withRouter(Summary);
