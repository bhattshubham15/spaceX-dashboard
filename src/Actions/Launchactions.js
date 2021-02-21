import axios from "axios";
import * as constants from "../Constants";
import {
    LAUNCHES_FETCHED,
    LAUNCHES_FETCH_ERROR,
    MODAL_ACTION,
    PAGINATE,
    LAUNCHES_DETAILS_FETCHED,
    LAUNCH_STATUS_FILTER
} from "../Types";

/**
 * Get all the launches
 */
export function fetchLaunches(dispatch) {
    return axios.get(constants.BASE_URL + constants.ALL_LAUNCHES)
        .then((response) => {
            if (response.status === 200) {
                const pageData = paginateData(response.data, 1);
                const totalPaginations = Math.ceil(response.data.length / 10);
                dispatch({ type: LAUNCHES_FETCHED, payload: response.data, pageData, totalPaginations });
            }
        })
        .catch((error) => {
            dispatch({ type: LAUNCHES_FETCH_ERROR, payload: error });
        })
}
/**
 * Get the launch by specific id
 */
export function fetchLaunchById(id) {
    return function (dispatch) {
        return axios.get(constants.BASE_URL + constants.ALL_LAUNCHES + `/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: LAUNCHES_DETAILS_FETCHED, payload: response.data });
                }
            })
            .catch((error) => {
                dispatch({ type: LAUNCHES_FETCH_ERROR, payload: error });
            })
    }
}
/**
 * Create data for pagination at the initial time
 */
export function paginateData(data, pageNumber) {
    let initialIndex = pageNumber === 1 ? 0 : (pageNumber * 10) - 10;
    const lastIndex = initialIndex + 10;
    return data.slice(initialIndex, lastIndex);
}
/**
 * Create data for pagination on click of page numbers
 */
export function paginateAction(data, pageNumber) {
    const pageData = paginateData(data, pageNumber);
    return function (dispatch) {
        dispatch({ type: PAGINATE, pageData });
    }
}
/**
 * Set the state data for modal
 */
export function setModal(showModal) {
    return function (dispatch) {
        dispatch({ type: MODAL_ACTION, showModal });
    }
}
/**
 * Filter data on the basis of launch status
 */
export function filterByLaunchStatus(value, stateData, originalData) {
    let newStateData = originalData.filter((item) => {
        if (value === 'upcoming-launches') {
            return item.upcoming === true;
        } else if (value === 'successful-launches') {
            return item.success === true;
        } else if (value === 'failed-launches') {
            return item.success === false;
        } else {
            return item;
        }
    });
    const pageData = paginateData(newStateData, 1);
    const totalPaginations = Math.ceil(newStateData.length / 10);
    return function (dispatch) {
        dispatch({ type: LAUNCH_STATUS_FILTER , newStateData, pageData, totalPaginations});
    }
}
