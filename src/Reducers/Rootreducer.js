import { LAUNCHES_FETCHED, LAUNCHES_FETCH_ERROR, PAGINATE } from "../Types";

const initialState = {
    data: '',
    pageData: '',
    totalPaginations: 10,
    error: '',
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCHES_FETCHED:
            return {
                ...state,
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
        default: return state;
    }
}
