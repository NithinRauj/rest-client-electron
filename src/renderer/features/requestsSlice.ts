import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestType, Request, APIResponse } from "../types";
import getUniqueId from "../utils/getUniqueId";



const initialState: Request[] = [
    {
        id: getUniqueId(),
        title: 'Request 1',
        url: 'http://localhost:4000/todos',
        type: RequestType.get,
        params: [],
        headers: [],
        body: '',
        response: { data: '' },
        loading: false
    }
];

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addRequest: (state, action: PayloadAction<Request>) => {
            state.push(action.payload);
        },
        deleteRequest: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(a => a.id == action.payload);
            if (index != -1) {
                state.splice(index, 1);
            }
        },
        setUrl: (state, action: PayloadAction<{ id: string, url: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].url = action.payload.url;
            }
        },
        setRequestType: (state, action: PayloadAction<{ id: string, type: RequestType }>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].type = action.payload.type;
            }
        },
        addHeader: (state, action: PayloadAction<{ requestId: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.requestId);
            if (index != -1) {
                state[index].headers.push({ headerId: getUniqueId(), key: '', value: '' });
            }
        },
        removeHeader: (state, action: PayloadAction<{ requestId: string, headerId: string }>) => {
            const { requestId, headerId } = action.payload
            const index = state.findIndex(a => a.id == requestId);
            const headerIndex = state[index].headers.findIndex((h) => h.headerId == headerId);
            if (index != -1 && headerIndex != -1) {
                state[index].headers.splice(headerIndex, 1);
            }
        },
        updateHeader: (state, action: PayloadAction<{ requestId: string, headerId: string, type: string, value: string }>) => {
            const { type, value, requestId, headerId } = action.payload;
            const index = state.findIndex(a => a.id == requestId);
            const headerIndex = state[index].headers.findIndex((h) => h.headerId == headerId);
            if (index != -1 && headerIndex != -1) {
                if (type == 'key') {
                    state[index].headers[headerIndex].key = value;
                } else {
                    state[index].headers[headerIndex].value = value;
                }
            }
        },
        addParam: (state, action: PayloadAction<{ requestId: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.requestId);
            if (index != -1) {
                state[index].params.push({ paramId: getUniqueId(), key: '', value: '' });
            }
        },
        removeParam: (state, action: PayloadAction<{ requestId: string, paramId: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.requestId);
            if (index != -1) {
                state[index].params.splice(state[index].params.findIndex((p) => p.paramId == action.payload.paramId), 1);
            }
        },
        updateParam: (state, action: PayloadAction<{ requestId: string, paramId: string, type: string, value: string }>) => {
            const { type, value, requestId, paramId } = action.payload;
            const index = state.findIndex(a => a.id == requestId);
            const paramIndex = state[index].params.findIndex((p) => p.paramId == paramId);
            if (index != -1 && paramIndex != -1) {
                if (type == 'key') {
                    state[index].params[paramIndex].key = value;
                } else {
                    state[index].params[paramIndex].value = value;
                }
            }
        },
        setBodyJson: (state, action: PayloadAction<{ id: string, body: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].body = action.payload.body;
            }
        },
        setResponse: (state, action: PayloadAction<{ id: string } & APIResponse>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].response = { ...state[index].response, ...action.payload };
            }
        },
        clearResponse: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].response = { data: '' };
            }
        },
        toggleLoadingState: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(a => a.id == action.payload.id);
            if (index != -1) {
                state[index].loading = !state[index].loading;
            }
        }
    }
});

export const {
    addRequest, deleteRequest, setRequestType,
    setUrl, addHeader, removeHeader,
    updateHeader, setBodyJson: setBodyJson,
    addParam, removeParam, updateParam,
    setResponse, clearResponse, toggleLoadingState
} = requestsSlice.actions;

export default requestsSlice.reducer;