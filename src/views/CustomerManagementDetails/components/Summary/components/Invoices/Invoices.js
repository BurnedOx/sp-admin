import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

import { Label } from 'components';

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

const Invoices = props => {
  const { customer, className, ...rest } = props;

  const classes = useStyles();

  const handleEditOpen = () => {};

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Other Details" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Wallet</TableCell>
              <TableCell>{customer.wallet}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>{customer.rank}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Direct Members</TableCell>
              <TableCell>{customer.direct}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Downline Members</TableCell>
              <TableCell>{customer.downline}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Single-leg Members</TableCell>
              <TableCell>{customer.singleLeg}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Level Income</TableCell>
              <TableCell>{customer.levelIncome}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Single-leg Income</TableCell>
              <TableCell>{customer.singleLegIncome}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Withdrawal</TableCell>
              <TableCell>{customer.totalWithdrawal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Income</TableCell>
              <TableCell>{customer.totalIncome}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      {/* <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button>
          <AttachMoneyIcon className={classes.buttonIcon} />
          Create Invoice
        </Button>
        <Button>
          <ReceiptIcon className={classes.buttonIcon} />
          Generate Due Invoices
        </Button>
      </CardActions> */}
    </Card>
  );
};

Invoices.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Invoices;
