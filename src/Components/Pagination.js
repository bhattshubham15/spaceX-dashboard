import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux'
import { paginateAction } from '../Actions/Launchactions';

class PaginationRounded extends Component {
    handleChange = (event, pageNumber) => {
        this.props.paginate(this.props.data, pageNumber);
    }
    render() {
        return (
            <div className="container paginationrounded__page">
                <Pagination count={this.props.totalPaginations} variant="outlined" shape="rounded" onChange={this.handleChange} />
            </div>
        );
    }
}

const mapStateToProps = (data) => {
    return {
        data: data && data.data,
        totalPaginations: data && data.totalPaginations,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        paginate: (data, pageNumber) => dispatch(paginateAction(data, pageNumber)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationRounded);
