import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  LatestProjects,
  NewProjects,
  RealTime,
  RoiPerCustomer,
  TeamTasks,
  DetailsCard,
  SystemHealth,
  PerformanceOverTime
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardDefault = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="Member Details & Genealogy" value={400} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="Wallet Details & Wallet Report" value={400} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="Withdrawal Request & Report" value={400} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="Transaction & Fund Transfer Report" value={400} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="E-Pin Generation & E-Pin Report" value={400} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <DetailsCard name="Member Incomes & Edit/Block" value={400} />
        </Grid>
        {/* <Grid
          item
          lg={3}
          xs={12}
        >
          <RealTime />
        </Grid> */}
        {/* <Grid
          item
          lg={9}
          xs={12}
        >
          <PerformanceOverTime />
        </Grid> */}
        {/* <Grid
          item
          lg={5}
          xl={4}
          xs={12}
        >
          <TeamTasks />
        </Grid> */}
        <Grid
          item
          lg={7}
          xl={8}
          xs={12}
        >
          <LatestProjects />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
