import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from 'actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const CustomerManagementList = () => {
  const classes = useStyles();

  const member = useSelector(state => state.member);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Member Management List"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      {member.members.length !== 0 && (
        <Results
          className={classes.results}
          customers={member.members}
        />
      )}
    </Page>
  );
};

export default CustomerManagementList;
