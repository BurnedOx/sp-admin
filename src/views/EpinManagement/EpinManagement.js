import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page, SearchBar } from 'components';
import { Header, Results } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEpins, getUnusedEpins, getUsedEpins } from 'actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const EpinManagementList = () => {
  const classes = useStyles();

  const epinStore = useSelector(state => state.epin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEpins());
  }, []);

  const handleFilter = (values) => {
    switch (values.epinStatus) {
      case 'all':
        return dispatch(getAllEpins());
      case 'used':
        return dispatch(getUsedEpins());
      case 'unused':
        return dispatch(getUnusedEpins());
    }
  };
  const handleSearch = () => { };

  return (
    <Page
      className={classes.root}
      title="Member Management List"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
        forFilter="epin"
      />
      {epinStore.epins.length !== 0 && (
        <Results
          className={classes.results}
          epins={epinStore.epins}
          filter={epinStore.filter}
        />
      )}
    </Page>
  );
};

export default EpinManagementList;
