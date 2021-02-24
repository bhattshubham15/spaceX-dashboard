import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import 'date-fns';
import DialogContent from '@material-ui/core/DialogContent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchLaunches, filterByDate, filterByLaunchStatus } from '../Actions/Launchactions';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class Calendarfilter extends Component {
    constructor() {
        super();
        this.calendarOptions = [
            "Select", "Past week", "Past month", "Past 3 months", "Past 6 months", "Past years"
        ];
    }
    state = {
        dialogOpen: false,
        fromDate: new Date(),
        toDate: new Date(),
        minDate: null,
        maxDate: null,
        calOption: "Select",
    }
    handleClickOpen = () => {
        this.setState({
            dialogOpen: true,
        })
    };
    handleClose = () => {
        this.setState({
            dialogOpen: false,
        })
    };
    calendarOptionChange = async (e) => {
        let fromDate;
        let toDate = new Date();
        let currentDate = new Date();
        currentDate = moment.utc(currentDate).local().format('YYYY-MM-DD');
        switch (e.target.id) {
            case "Past week":
                fromDate = this.getSubtractedDate(currentDate, 14, "days");
                toDate = this.getSubtractedDate(currentDate, 7, "days");
                break;
            case "Past month":
                fromDate = this.getSubtractedDate(currentDate, 1, "month");
                break;
            case "Past 3 months":
                fromDate = this.getSubtractedDate(currentDate, 3, "months");
                toDate = this.getSubtractedDate(currentDate, 1, "months");;
                break;
            case "Past 6 months":
                fromDate = this.getSubtractedDate(currentDate, 6, "months");
                toDate = this.getSubtractedDate(currentDate, 1, "months");
                break;
            case "Past years":
                fromDate = this.getSubtractedDate(currentDate, 1, "years");
                break;
        }
        if (e.target.id == "Select") {
            this.setState({
                calOption: e.target.id,
            })
            let queryParams = new URLSearchParams(window.location.search);
            queryParams.delete("start");
            queryParams.delete("end");
            this.props.history.push("?" + queryParams.toString());
            await this.props.getLaunches();
            const launchType = queryParams.get("launch_type");
            if (launchType) {
                this.props.filterByLaunch(launchType.toString(), this.props.originalData);
            }
            return;
        }
        this.setState({
            calOption: e.target.id,
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
        }, () => {
            const fdate = moment(fromDate).format('YYYY-MM-DD');
            const tdate = moment(toDate).format('YYYY-MM-DD');
            this.createQueryParam(fdate, tdate);
        })
    }
    onCalendarChangeFrom = (value) => {
        this.setState({
            fromDate: value,
            minDate: value,
        })
    }
    onCalendarChangeTo = (value) => {
        this.setState({
            toDate: value,
            maxDate: value,
        }, async () => {
            await this.onCalendarChange();
        })
    }
    onCalendarChange = () => {
        let currentDate = new Date();
        currentDate = moment.utc(currentDate).local().format('YYYY-MM-DD');
        const selectedFromDate = moment.utc(this.state.fromDate).local().format('YYYY-MM-DD');
        const selectedToDate = moment.utc(this.state.toDate).local().format('YYYY-MM-DD');

        if (selectedFromDate >= this.getSubtractedDate(currentDate, 14, "days") && (selectedToDate <= this.getSubtractedDate(currentDate, 7, "days") && selectedFromDate <= selectedToDate)) {
            this.setState({
                calOption: "Past week"
            })
        }
        if (moment(selectedFromDate).format('M') == (moment(currentDate).format('M') - 1) && moment(selectedToDate).format('M') == (moment(currentDate).format('M') - 1)) {
            this.setState({
                calOption: "Past month"
            })
        }
        if ((selectedFromDate >= this.getSubtractedDate(currentDate, 3, "months")) && moment(selectedToDate).format('M') == (moment(currentDate).format('M') - 1)) {
            this.setState({
                calOption: "Past 3 months"
            })
        }
        if ((selectedFromDate >= this.getSubtractedDate(currentDate, 6, "months")) && moment(selectedToDate).format('M') == (moment(currentDate).format('M') - 1)) {
            this.setState({
                calOption: "Past 6 months"
            })
        }
        if ((selectedToDate <= this.getSubtractedDate(currentDate, 6, "months")) && (selectedFromDate <= selectedToDate)) {
            this.setState({
                calOption: "Past years"
            })
        }
        this.createQueryParam(moment(selectedFromDate).format('YYYY-MM-DD'), moment(selectedToDate).format('YYYY-MM-DD'));
    }
    getSubtractedDate = (currentDate, duration, key) => {
        return moment(currentDate).subtract(duration, key).format('YYYY-MM-DD');
    }
    createQueryParam = async (fromDate, toDate) => {
        let queryParams = new URLSearchParams(window.location.search);
        queryParams.set("start", fromDate);
        queryParams.set("end", toDate);
        this.props.history.push("?" + queryParams.toString());
        await this.props.filterByDate(fromDate, toDate);
        const launchType = queryParams.get("launch_type");
        if (launchType) {
            this.props.filterByLaunch(launchType.toString(), this.props.originalData);
        }
    }
    render() {
        return (
            <div>
                <Button color="primary" onClick={this.handleClickOpen}>
                    {this.state.calOption}
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.dialogOpen} maxWidth="md">
                    <DialogContent dividers>
                        <div className="calendarfilter__parent">
                            <div className="calendarfilter__left">
                                {
                                    this.calendarOptions.map((item, index) => {
                                        return (<div key={index} onClick={this.calendarOptionChange} id={item} className="calendarfilter__calendaroptions">{item}</div>)
                                    })
                                }
                            </div>
                            <div className="calendarfilter__middle">
                                <Calendar
                                    onChange={this.onCalendarChangeFrom}
                                    value={this.state.fromDate}
                                    maxDate={this.state.maxDate}
                                />
                            </div>
                            <div className="calendarfilter__right">
                                <Calendar
                                    onChange={this.onCalendarChangeTo}
                                    value={this.state.toDate}
                                    minDate={this.state.minDate}
                                />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div >
        )
    }
}

const mapStateToProps = (data, ownProps) => {
    return {
        data: data && data.data,
        pageData: data && data.pageData,
        originalData: data && data.originalData,
        filterLaunchType: data && data.filterLaunchType,
        ownProps,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLaunches: () => dispatch(fetchLaunches),
        filterByDate: (fromDate, toDate) => dispatch(filterByDate(fromDate, toDate)),
        filterByLaunch: (value, originalData) => dispatch(filterByLaunchStatus(value, originalData)),
    };
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Calendarfilter);
