import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { setModal } from '../Actions/Launchactions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ImageAvatars from './Avatar';
import SkeletonAnimation from './Skeleton';
import PublicIcon from '@material-ui/icons/Public';
import YouTubeIcon from '@material-ui/icons/YouTube';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

class Modal extends Component {
    handleModal = () => {
        this.props.setModal(!this.props.showModal)
    };
    render() {
        const { modalData } = this.props;
        return (
            <Dialog
                open={this.props.showModal}
                onClose={this.handleModal}
                aria-labelledby="responsive-dialog-title"
            >
                {this.props.modalData ?
                    <div>
                        <div className="row">
                            <div className="left grid-container">
                                <div className="grid-item image">
                                    <ImageAvatars launchImage={modalData.links.patch.small} />
                                </div>
                                <div className="grid-item">
                                    <h5>{modalData.name}</h5>
                                </div>
                                <div className="grid-item">
                                    <p>
                                        {modalData.upcoming === true ? <span className="new badge upcoming" data-badge-caption="Upcoming" /> : (modalData.success === true ? <span className="new badge success" data-badge-caption="Success" /> : <span className="new badge failed" data-badge-caption="Failed" />)}
                                    </p>
                                </div>
                                <div className="grid-item">
                                    <a href={modalData.links.article} target="blank">
                                        <PublicIcon />
                                    </a>
                                    <a href={modalData.links.webcast} target="blank">
                                        <YouTubeIcon />
                                    </a>
                                </div>
                            </div>
                            <div className="right">
                                <DialogActions>
                                    <IconButton aria-label="close" onClick={this.handleModal}>
                                        <CloseIcon />
                                    </IconButton>
                                </DialogActions>
                            </div>
                        </div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {modalData.details ? modalData.details : 'No details...'}
                                <a href={modalData.links.wikipedia} target="blank">Wikipedia</a>
                            </DialogContentText>
                            <List >
                                <ListItem alignItems="flex-start">
                                    <ListItemText primary={"Flight Number"} />
                                    <ListItemText primary={modalData.flight_number} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={"Mission Name"} />
                                    <ListItemText primary={modalData.name} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={"Launch Date"} />
                                    <ListItemText primary={moment.utc(modalData.date_utc).local().format('D MMMM YYYY, LT')} />
                                </ListItem>
                            </List>
                        </DialogContent>
                    </div> :
                    <div className="modal__skeleton">
                        <SkeletonAnimation />
                    </div>
                }
            </Dialog>
        )
    }
}

const mapStateToProps = (data) => {
    return {
        data: data && data.data,
        pageData: data && data.pageData,
        showModal: data && data.showModal,
        modalData: data && data.modalData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setModal: (check) => dispatch(setModal(check)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
