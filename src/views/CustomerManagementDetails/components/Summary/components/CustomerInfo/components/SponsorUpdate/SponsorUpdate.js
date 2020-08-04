import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Button,
  colors
} from '@material-ui/core';
import axios from 'utils/axios';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const SponsorUpdate = props => {
  const { open, onClose, id, className, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    sponsorId: ''
  });

  if (!open) {
    return null;
  }

  const handleFieldChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  const onSave = () => {
    const state = {...formState}
    axios.put(`/accounts/update-sponsor/${id}`, state)
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
            >
              Update Sponsor
            </Typography>
            <Grid
              className={classes.container}
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="New Sponsor Id"
                  name="sponsorId"
                  onChange={handleFieldChange}
                  value={formState.sponsorId}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              onClick={onClose}
              variant="contained"
            >
              Close
            </Button>
            <Button
              className={classes.saveButton}
              onClick={onSave}
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

SponsorUpdate.displayName = 'CustomerEdit';

SponsorUpdate.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

SponsorUpdate.defaultProps = {
  open: false,
  onClose: () => { }
};

export default SponsorUpdate;
