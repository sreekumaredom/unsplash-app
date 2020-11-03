import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//Actions
import { toggleModal } from '../../redux/modal/modal.actions.js';
import { addImage, deleteImage } from '../../redux/images/images.actions.js';

//Selectors
import { selectModalType } from '../../redux/modal/modal.selectors.js';
import { selectDeleteId } from '../../redux/images/images.selectors';

//Material UI
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = (theme) => ({
  root: {
    '& > *': {
      width: '50vw',
    },
  },

  btnSpace: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '30px',
  },
});

class ModalForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      password: '',
      url: '',
    };
  }

  modalForm = null;

  handleLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  handleUrlChange = (e) => {
    this.setState({ url: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  returnModalForm(type) {
    let modalForm;

    if (type) {
      modalForm = (
        <div>
          <h2 id="transition-modal-title">Are you sure?</h2>

          <div>
            <TextField
              id="outlined-secondary"
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              fullWidth={true}
              onChange={this.handlePasswordChange}
            />
          </div>

          <div className={this.props.classes.btnSpace}>
            <Button
              variant="contained"
              style={{ textTransform: 'none', borderRadius: '24px' }}
              onClick={this.props.toggleModal}
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ textTransform: 'none', borderRadius: '24px' }}
              size="large"
              onClick={() => {
                this.props.deleteImage(this.props.deleteId);
                this.props.toggleModal();
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      );
    } else {
      modalForm = (
        <div>
          <h2 id="transition-modal-title">Add a new photo</h2>

          <div>
            <TextField
              id="outlined-secondary"
              label="Label"
              variant="outlined"
              color="primary"
              fullWidth={true}
              onChange={this.handleLabelChange}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <TextField
              id="outlined-secondary"
              label="Photo URL"
              variant="outlined"
              color="primary"
              fullWidth={true}
              onChange={this.handleUrlChange}
            />
          </div>
          <div className={this.props.classes.btnSpace}>
            <Button
              variant="contained"
              style={{ textTransform: 'none', borderRadius: '24px' }}
              onClick={this.props.toggleModal}
              size="large"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: 'none', borderRadius: '24px' }}
              size="large"
              onClick={() => {
                this.props.addImage({
                  image_name: this.state.label,
                  url: this.state.url,
                });
                this.props.toggleModal();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }

    return modalForm;
  }

  render() {
    const modalForm = this.returnModalForm(this.props.type);

    return (
      <form className={this.props.classes.root} noValidate autoComplete="off">
        {modalForm}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => dispatch(toggleModal()),
  addImage: (img) => dispatch(addImage(img)),
  deleteImage: (id) => dispatch(deleteImage(id)),
});

const mapStateToProps = createStructuredSelector({
  type: selectModalType,
  deleteId: selectDeleteId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ModalForm));