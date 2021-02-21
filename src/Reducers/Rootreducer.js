import {
    LAUNCHES_DETAILS_FETCHED,
    LAUNCHES_FETCHED,
    LAUNCHES_FETCH_ERROR,
    LAUNCH_STATUS_FILTER,
    MODAL_ACTION,
    PAGINATE
} from "../Types";

const initialState = {
    originalData: '',
    data: '',
    pageData: '',
    totalPaginations: 10,
    showModal: false,
    modalData: '',
    error: '',
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCHES_FETCHED:
            return {
                ...state,
                originalData: action.payload, 
                data: action.payload,
                pageData: action.pageData,
                totalPaginations: action.totalPaginations,
            }
        case LAUNCHES_FETCH_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case PAGINATE:
            return {
                ...state,
                pageData: action.pageData,
            }
        case MODAL_ACTION:
            return {
                ...state,
                modalData: '',
                showModal: action.showModal
            }
        case LAUNCHES_DETAILS_FETCHED:
            return {
                ...state,
                modalData: action.payload
            }
        case LAUNCH_STATUS_FILTER:
            return {
                ...state,
                data: action.newStateData,
                pageData: action.pageData,
                totalPaginations: action.totalPaginations,
            }
        default: return state;
    }
}
