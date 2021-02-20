import React, { Component } from 'react'

class Filters extends Component {
    render() {
        return (
            <div className="container filters">
                <span className="filters__calender">
                    Past 6 Months
                </span>
                <span className="filters__launches">
                    All Launches
                </span>
            </div>
        )
    }
}

export default Filters; 
