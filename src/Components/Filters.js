import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { filterByLaunchStatus } from '../Actions/Launchactions';
import { connect } from 'react-redux';
import Calendarfilter from './Calendarfilter';
class Filters extends Component {
    handleChange = (e) => {
        this.props.filterByLaunch(e.target.value, this.props.data, this.props.originalData)
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

const mapStateToProps = (data) => {
    return {
        data: data && data.data,
        originalData: data && data.originalData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterByLaunch: (value, stateData, originalData) => dispatch(filterByLaunchStatus(value, stateData, originalData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
