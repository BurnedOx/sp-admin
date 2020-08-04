import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
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
  TableCell,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';

import { Label } from 'components';
import { CustomerEdit } from './components';
import ResetPassword from './components/ResetPassword';
import SponsorUpdate from './components/SponsorUpdate';

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

const CustomerInfo = props => {
  const { customer, className, onUpdate, ...rest } = props;

  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [openSp, setOpenSp] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handlePassOpen = () => {
    setOpenPass(true);
  };

  const handlePassClose = () => {
    setOpenPass(false);
  };

  const handleSpOpen = () => {
    setOpenSp(true);
  };

  const handleSpClose = () => {
    setOpenSp(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Customer info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Id</TableCell>
              <TableCell>{customer.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>E-PIN & status</TableCell>
              <TableCell>
                {customer.epinId}
                <div>
                  <Label
                    color={
                      customer.status === 'active' ? colors.green[600] : colors.orange[600]
                    }
                  >
                    {customer.status === 'active'
                      ? 'Account activated'
                      : 'Account not activated'}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Phone</TableCell>
              <TableCell>{customer.mobile}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sponsored By</TableCell>
              <TableCell>
                {customer.sponsoredBy ? customer.sponsoredBy.name : null}
                <div>
                  <Label color={colors.green[600]}>
                    {customer.sponsoredBy ? customer.sponsoredBy.id : null}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>PAN Number</TableCell>
              <TableCell>{customer.panNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>{customer.roll}</TableCell>
            </TableRow>
            {customer.activatedAt ?
              <TableRow selected>
                <TableCell>Activated At</TableCell>
                <TableCell>
                  {moment(customer.activatedAt).format('DD MMM YYYY | hh:mm')}
                </TableCell>
              </TableRow> : null}
            <TableRow>
              <TableCell>Updated At</TableCell>
              <TableCell>
                {moment(customer.updatedAt).format('DD MMM YYYY | hh:mm')}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Created At</TableCell>
              <TableCell>
                {moment(customer.createdAt).format('DD MMM YYYY | hh:mm')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button onClick={handlePassOpen}>
          <LockOpenIcon className={classes.buttonIcon} />
          Reset &amp; Send Password
        </Button>
        <Button onClick={handleSpOpen}>
          <PersonIcon className={classes.buttonIcon} />
          Update Sponsor
        </Button>
      </CardActions>
      <CustomerEdit
        customer={customer}
        onClose={handleEditClose}
        open={openEdit}
        save={onUpdate}
      />
      <ResetPassword
        id={customer.id}
        open={openPass}
        onClose={handlePassClose}
      />
      <SponsorUpdate
        id={customer.id}
        open={openSp}
        onClose={handleSpClose}
      />
    </Card>
  );
};

CustomerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
};

export default CustomerInfo;
