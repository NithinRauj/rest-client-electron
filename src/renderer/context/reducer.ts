import actionTypes from '../actionTypes';

export type Action = {
    type: string,
    payload?: { [key1: string]: any }
}

export type AppState = {
    requests: {
        [key: string]: {
            id: string,
            title: string,
            url: string,
            params: { index: number, key: string, value: string }[],
            headers: { index: number, key: string, value: string }[],
            body: string
        }
    }
};

export const initialState: AppState = {
    requests: {
        '1': {
            id: '1',
            title: 'New Request 1',
            url: '',
            params: [
                { index: 0, key: '', value: '' }
            ],
            headers: [
                { index: 0, key: '', value: '' }
            ],
            body: ''
        }
    }
};

export default function reducer(state: AppState, action: Action) {
    const { type, payload } = action
    switch (type) {
        case actionTypes.CREATE_REQUEST:
            return {
                requests: {
                    ...state.requests,
                    [payload.newTabId]: {
                        id: payload.newTabId,
                        title: `New Request ${payload.newTabId}`,
                        url: '',
                        params: [
                            { index: 0, key: '', value: '' }
                        ],
                        headers: [
                            { index: 0, key: '', value: '' }
                        ],
                    }
                }
            }
        default:
            return state;
    }
}