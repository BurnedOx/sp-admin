import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Alert, Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawals, gotWithdrawError } from 'actions';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const OrderManagementList = () => {
  const classes = useStyles();
  const withdrawalStore = useSelector(state => state.withdrawal);
  const dispatch = useDispatch();

  const { withdrawals, filter, error } = withdrawalStore;

  useEffect(() => {
    if (filter && filter !== 'all') {
      dispatch(getWithdrawals(filter));
    } else {
      dispatch(getWithdrawals());
    }
  }, []);

  const handleError = () => dispatch(gotWithdrawError());

  const handleFilter = (values) => {
    if (values.status !== 'all') {
      dispatch(getWithdrawals(values.status));
    } else {
      dispatch(getWithdrawals());
    }
  };

  return (
    <Page
      className={classes.root}
      title="Withdrawals Management List"
    >
      <Header />
      <SearchBar
        forFilter="withdrawal"
        onFilter={handleFilter} />
      <Results
        className={classes.results}
        orders={withdrawals}
        filter={filter}
      />

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert variant="error" message={error} onClose={handleError} />
      </Snackbar>
    </Page>
  );
};

export default OrderManagementList;
