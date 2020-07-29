import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import { Search, Filter } from './components';
import EpinFilter from './components/EpinFilter';
import WithdrawalFilter from './components/WithdrawalFilter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  search: {
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480
  },
  filterButton: {
    marginLeft: 'auto'
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SearchBar = props => {
  const { onFilter, onSearch, className, forFilter, ...rest } = props;

  const classes = useStyles();

  let filterComponent;

  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  switch (forFilter) {
    case 'epin':
      filterComponent = <EpinFilter
        onClose={handleFilterClose}
        onFilter={onFilter}
        open={openFilter} />;
      break;
    case 'withdrawal':
      filterComponent = <WithdrawalFilter
        onClose={handleFilterClose}
        onFilter={onFilter}
        open={openFilter} />;
      break;
    default:
      filterComponent = <Filter
        onClose={handleFilterClose}
        onFilter={onFilter}
        open={openFilter}
      />;
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item>
        <Search
          className={classes.search}
          onSearch={onSearch}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.filterButton}
          color="primary"
          onClick={handleFilterOpen}
          size="small"
          variant="outlined"
        >
          <FilterListIcon className={classes.filterIcon} /> Show filters
        </Button>
      </Grid>
      {filterComponent}
    </Grid>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
  forFilter: PropTypes.string
};

export default SearchBar;
