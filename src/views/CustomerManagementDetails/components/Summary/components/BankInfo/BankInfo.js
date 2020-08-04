import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import BankInfoEdit from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const BankInfo = props => {
  const { bankInfo, className, ...rest } = props;

  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Bank info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Account Name</TableCell>
              <TableCell>{bankInfo && bankInfo.accountName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bank Name</TableCell>
              <TableCell>{bankInfo && bankInfo.bankName}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Account Number</TableCell>
              <TableCell>{bankInfo && bankInfo.accountNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IFS Code</TableCell>
              <TableCell>{bankInfo && bankInfo.isfc}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Account Type</TableCell>
              <TableCell>{bankInfo && bankInfo.accountType}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
      </CardActions>
      <BankInfoEdit
        customer={bankInfo}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  );
};

BankInfo.propTypes = {
  className: PropTypes.string,
  bankInfo: PropTypes.object.isRequired
};

export default BankInfo;
