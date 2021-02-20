import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLaunches } from '../Actions/Launchactions';
import Loader from './Loader';

class Grid extends Component {
    componentDidMount() {
        this.props.getLaunches(); // get all the launches
    }
    render() {
        return (
            <div className="container grid">
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Launched (UTC)</th>
                            <th>Mission</th>
                            <th>Launch Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.pageData ?
                            this.props.pageData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{(item.flight_number).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</td>
                                        <td>{item.date_utc}</td>
                                        <td>{item.name}</td>
                                        <td>{item.upcoming === true ? <span className="new badge upcoming" data-badge-caption="Upcoming" /> : (item.success === true ? <span className="new badge success" data-badge-caption="Success" /> : <span className="new badge failed" data-badge-caption="Failed" />)}</td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td>
                                    <Loader isOpen={true} />
                                </td>
                            </tr>
                        }
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLaunches: () => dispatch(fetchLaunches),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
