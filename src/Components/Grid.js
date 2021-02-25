import moment from 'moment';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLaunchById, fetchLaunches, filterByDate, filterByLaunchStatus, setModal } from '../Actions/Launchactions';
import Loader from './Loader';
import Modal from './Modal';

class Grid extends Component {
    async componentDidMount() {
        await this.props.getLaunches(); // get all the launches
        const launchType = new URLSearchParams(window.location.search).get('launch_type');
        const startDate = new URLSearchParams(window.location.search).get('start');
        const endDate = new URLSearchParams(window.location.search).get('end');
        if (startDate && endDate) {
            await this.props.filterByDate(startDate, endDate);
        }
        this.props.filterByLaunch(launchType, this.props.originalData);
    }
    handleRowClick = (id) => {
        this.props.fetchLaunchById(id);
        this.props.setModal(!this.props.showModal);
    }
    render() {
        return (
            <div className="container grid">
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Launched (UTC)</th>
                            <th>Location</th>
                            <th>Mission</th>
                            <th>Orbit</th>
                            <th>Launch Status</th>
                            <th>Rocket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.pageData.length !== 0 ?
                            this.props.pageData.map((item, index) => {
                                return (
                                    <tr key={index} className="grid__row-data" onClick={() => this.handleRowClick(item.flight_number)}>
                                        <td>{(item.flight_number).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</td>
                                        <td>{moment.utc(item.date_utc).local().format('D MMMM YYYY, LT')}</td>
                                        <td>{item.launch_site.site_name}</td>
                                        <td>{item.mission_name}</td>
                                        <td>{item.rocket.second_stage.payloads[0].orbit}</td>
                                        <td>{item.upcoming === true ? <span className="new badge upcoming" data-badge-caption="Upcoming" /> : (item.launch_success === true ? <span className="new badge success" data-badge-caption="Success" /> : <span className="new badge failed" data-badge-caption="Failed" />)}</td>
                                        <td>{item.rocket.rocket_name}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td>
                                    {(this.props.noDataFound) ? <div>No data found...</div> : <Loader isOpen={true} />}
                                </td>
                            </tr>
                        }
                        <tr>
                            <Modal />
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (data) => {
    return {
        data: data && data.data,
        pageData: data && data.pageData,
        showModal: data && data.showModal,
        modalData: data && data.modalData,
        originalData: data && data.originalData,
        noDataFound: data.noDataFound,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLaunches: () => dispatch(fetchLaunches),
        setModal: (check) => dispatch(setModal(check)),
        fetchLaunchById: (id) => dispatch(fetchLaunchById(id)),
        filterByLaunch: (value, originalData) => dispatch(filterByLaunchStatus(value, originalData)),
        filterByDate: (fromDate, toDate) => dispatch(filterByDate(fromDate, toDate)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
