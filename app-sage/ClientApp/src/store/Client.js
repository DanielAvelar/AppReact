﻿const initialState = {
    people: [],
    addresses: [],
    personId: '',
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestPeople: () => async (dispatch, getState) => {

        const url = 'api/Client/People';
        const response = await fetch(url);
        const people = await response.json();
        dispatch({ type: 'FETCH_PEOPLE', people });
    },
    savePerson: person => async (dispatch, getState) => {

        const url = 'api/Client/SavePerson';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(person)
        };
        const request = new Request(url, requestOptions);
        const response = await fetch(request);
        const personRes = await response.json();
        initialState.personId = personRes.personId;
        dispatch({ type: 'SAVE_PERSON', personRes });
    },
    deletePerson: personId => async (dispatch, getState) => {
        const url = 'api/Client/DeletePerson/' + personId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_PERSON', personId });
    },
    requestAddresses: () => async (dispatch, getState) => {

        const url = 'api/Client/Addresses';
        const response = await fetch(url);
        const addresses = await response.json();
        dispatch({ type: 'FETCH_ADDRESSES', addresses });
    },
    saveAddress: address => async (dispatch, getState) => {

        const url = 'api/Client/SaveAddress';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(address)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_ADDRESS', address });
    },
    deleteAddress: addressId => async (dispatch, getState) => {
        const url = 'api/Client/DeleteAddress/' + addressId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_ADDRESS', addressId });
    }
};

//export const reducer = (state, action) => {
//    state = state || initialState;

//    switch (action.type) {
//        case 'FETCH_PEOPLE': {
//            return {
//                ...state,
//                people: action.people,
//                loading: false,
//                errors: {},
//                forceReload: false
//            }
//        }
//        case 'SAVE_PERSON': {
//            return {
//                ...state,
//                //people: Object.assign({}, action.personRes),
//                person: action.personRes,
//                personId: action.personRes.personId,
//                forceReload: false
//            }
//        }
//        case 'DELETE_PERSON': {
//            return {
//                ...state,
//                personId: action.personId,
//                forceReload: true
//            }
//        }
//        default:
//            return state;
//    }
//};
export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_PEOPLE': {
            return {
                ...state,
                people: action.people,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_PERSON': {
            return {
                ...state,
                people: Object.assign({}, action.personRes),
                personId: action.personRes.personId,
                forceReload: false
            }
        }
        case 'DELETE_PERSON': {
            return {
                ...state,
                personId: action.personId,
                forceReload: true
            }
        }
        case 'FETCH_ADDRESSES': {
            return {
                ...state,
                addresses: action.addresses,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_ADDRESS': {
            return {
                ...state,
                addresses: Object.assign({}, action.address),
                forceReload: true
            }
        }
        case 'DELETE_ADDRESS': {
            return {
                ...state,
                addressId: action.addressId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
