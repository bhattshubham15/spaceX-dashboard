import axios from "axios";
import * as constants from "../Constants";
import { LAUNCHES_FETCHED, LAUNCHES_FETCH_ERROR, PAGINATE } from "../Types";

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

export function paginateData(data, pageNumber) {
    let initialIndex = pageNumber === 1 ? 0 : (pageNumber * 10) - 10;
    const lastIndex = initialIndex + 10;
    return data.slice(initialIndex, lastIndex);
}

export function paginateAction(data, pageNumber) {
    const pageData = paginateData(data, pageNumber);
    return function (dispatch) {
        dispatch({ type: PAGINATE, pageData });
    }
}
