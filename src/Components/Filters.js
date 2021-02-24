import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchLaunches, filterByLaunchStatus } from '../Actions/Launchactions';
import { connect } from 'react-redux';
import Calendarfilter from './Calendarfilter';
import { withRouter } from 'react-router';
import { compose } from 'redux';
class Filters extends Component {
    state = {
        menuItemValue: "all-launches",
    }
    componentDidMount() {
        const launchType = new URLSearchParams(window.location.search).get('launch_type');
        if (launchType) {
            this.setState({
                menuItemValue: launchType
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            menuItemValue: e.target.value
        })
        let queryParams = new URLSearchParams(window.location.search);
        let urlValue;
        if (e.target.value === "successful-launches") {
            urlValue = "successful-launches";
        } else if (e.target.value === "upcoming-launches") {
            urlValue = "upcoming-launches";
        } else if (e.target.value === "failed-launches") {
            urlValue = "failed-launches";
        }
        if (e.target.value != "all-launches") {
            queryParams.set("launch_type", urlValue);
            this.props.history.push("?" + queryParams.toString());
        } else {
            queryParams.delete("launch_type");
            this.props.history.push("?" + queryParams.toString());
        }
        this.props.filterByLaunch(e.target.value, this.props.originalData)
    }
    render() {
        return (
            <div className="container filters">
                <span className="filters__calender">
                    <Calendarfilter />
                </span>
                <span className="filters__launches">
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue="all-launches"
                            value={this.state.menuItemValue}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="all-launches">All Launches</MenuItem>
                            <MenuItem value="upcoming-launches">Upcoming Launches</MenuItem>
                            <MenuItem value="successful-launches">Successful Launches</MenuItem>
                            <MenuItem value="failed-launches">Failed Launches</MenuItem>
                        </Select>
                    </FormControl>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (data, ownProps) => {
    return {
        data: data && data.data,
        filterLaunchType: data && data.filterLaunchType,
        filterStartDate: data && data.filterStartDate,
        filterEndDate: data && data.filterEndDate,
        originalData: data && data.originalData,
        ownProps,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLaunches: () => dispatch(fetchLaunches),
        filterByLaunch: (value, originalData) => dispatch(filterByLaunchStatus(value, originalData)),
    };
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Filters);
