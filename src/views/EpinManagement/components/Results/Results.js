import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { ReviewStars, GenericMoreButton, TableEditBar } from 'components';
import { getFormatedDate } from 'utils/getTime';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, epins, filter, ...rest } = props;

  const classes = useStyles();

  const [selectedEpins, setSelectedEpins] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = event => {
    const selectedEpins = event.target.checked
      ? epins.map(epin => epin.id)
      : [];

    setSelectedEpins(selectedEpins);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEpins.indexOf(id);
    let newSelectedEpins = [];

    if (selectedIndex === -1) {
      newSelectedEpins = newSelectedEpins.concat(selectedEpins, id);
    } else if (selectedIndex === 0) {
      newSelectedEpins = newSelectedEpins.concat(
        selectedEpins.slice(1)
      );
    } else if (selectedIndex === selectedEpins.length - 1) {
      newSelectedEpins = newSelectedEpins.concat(
        selectedEpins.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedEpins = newSelectedEpins.concat(
        selectedEpins.slice(0, selectedIndex),
        selectedEpins.slice(selectedIndex + 1)
      );
    }

    setSelectedEpins(newSelectedEpins);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {epins.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(epins.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={`${filter.toUpperCase()} EPINS`}
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedEpins.length === epins.length}
                        color="primary"
                        indeterminate={
                          selectedEpins.length > 0 &&
                          selectedEpins.length < epins.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>OWNER ID</TableCell>
                    <TableCell>OWNER NAME</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>CREATED AT</TableCell>
                    <TableCell>UPDATED AT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {epins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(epin => (
                    <TableRow
                      hover
                      key={epin.id}
                      selected={selectedEpins.indexOf(epin.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedEpins.indexOf(epin.id) !== -1
                          }
                          color="primary"
                          onChange={event =>
                            handleSelectOne(event, epin.id)
                          }
                          value={selectedEpins.indexOf(epin.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>{epin.id}</TableCell>
                      <TableCell>{epin.owner ? epin.owner.id : "Unavailable"}</TableCell>
                      <TableCell>{epin.owner ? epin.owner.name : "Unavailable"}</TableCell>
                      <TableCell>{epin.status}</TableCell>
                      <TableCell>{getFormatedDate(epin.createdAt)}</TableCell>
                      <TableCell>{getFormatedDate(epin.updatedAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={epins.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedEpins} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  epins: PropTypes.array.isRequired
};

Results.defaultProps = {
  epins: []
};

export default Results;
