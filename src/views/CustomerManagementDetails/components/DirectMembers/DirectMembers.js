import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';

import axios from 'utils/axios';
import { GenericMoreButton, Label } from 'components';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  }
}));

const DirectMembers = props => {
  const { className, match, ...rest } = props;

  const classes = useStyles();
  const { id } = match.params;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      axios.get(`/members/${id}/direct`).then(response => {
        if (mounted) {
          setMembers(response.data);
        }
      });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Direct Members"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Activated At</TableCell>
                    <TableCell>DOJ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map(member => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.level}</TableCell>
                      <TableCell>
                        <Label color={member.status === 'active' ? colors.green[600] : colors.orange[600]}>
                          {member.status}
                        </Label>
                      </TableCell>
                      <TableCell>
                        {member.activatedAt && moment(member.activatedAt).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>
                        {moment(member.createdAt).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

DirectMembers.propTypes = {
  className: PropTypes.string
};

export default withRouter(DirectMembers);
