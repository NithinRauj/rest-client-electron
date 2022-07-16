import { Button, Flex, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearResponse, deleteRequest, setRequestType, setResponse, setUrl, toggleLoadingState } from '../features/requestsSlice';
import { RootState } from '../features/store';
import { Header, Param, RequestType } from '../types';
import BodySection from './BodySection';
import HeadersSection from './HeadersSection';
import ParamsSection from './ParamsSection';
import ResponseSection from './ResponseSection';

type RequestTabProps = {
    id: string,
    onTabChange: (id: string) => void
}

const RequestTab = ({ id, onTabChange }: RequestTabProps) => {

    const dispatch = useDispatch();
    const request = useSelector((state: RootState) => state.requests.find(r => r.id == id));

    const handleDeleteRequest = () => {
        dispatch(deleteRequest(id));
        onTabChange(id);
    }

    const onChangeRequestType = (type: RequestType) => {
        dispatch(setRequestType({ id, type }));
    }

    const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUrl({ id, url: e.target.value }));
    }

    const onSendRequest = () => {
        dispatch(toggleLoadingState({ id }));
        dispatch(clearResponse({ id }));
        triggerApiCall(request.url, request.type, request.headers, request.params, request.body);

    }

    const triggerApiCall = async (url: string, type: RequestType, headerArray: Header[], params: Param[], body: string) => {
        const urlW̥ithParams = params.length ? url + '?' + params.map((p) => `${p.key}=${p.value}`).join('&') : url;
        const headers: { [key: string]: string } = {};
        headerArray.forEach((h) => Object.assign(headers, { [h.key]: h.value }));

        axios({ method: type, url: urlW̥ithParams, headers, data: body }).then((res) => {
            const response = { data: JSON.stringify(res.data), statusCode: res.status, statusText: res.statusText, responseTime: res.headers['response-time'] };
            dispatch(setResponse({ id, ...response }));
            dispatch(toggleLoadingState({ id }));
        })
            .catch((res: AxiosError) => {
                const { data = {}, status, statusText = 'Error' } = res.response;
                const response = { data: JSON.stringify(data), statusCode: status, statusText: statusText };
                dispatch(setResponse({ id, ...response }));
                dispatch(toggleLoadingState({ id }));
            });
    }

    return (<>
        <Button colorScheme={'red'} onClick={handleDeleteRequest} size={'md'} borderRadius={'5px'} margin={'10px 0px'}>Delete Request</Button>
        <Flex marginBottom={5}>
            <Select size='md' width={'165px'} borderTopRightRadius={'0px'}
                borderBottomRightRadius={'0px'}
                defaultValue={request.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeRequestType(e.target.value as RequestType)}
            >
                <option value='post'>POST</option>
                <option value='get'>GET</option>
                <option value='put'>PUT</option>
                <option value='patch'>PATCH</option>
                <option value='delete'>DELETE</option>
            </Select>
            <Input placeholder='https://api.dev.com' borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} value={request.url} onChange={onChangeUrl} />
            <Button isLoading={request.loading} colorScheme={'green'} marginLeft={'10px'} onClick={onSendRequest} disabled={!request.url || request.loading}>Send</Button>
        </Flex>
        <Tabs>
            <TabList>
                <Tab>Params</Tab>
                <Tab>Headers</Tab>
                <Tab>Body</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ParamsSection id={id} />
                </TabPanel>
                <TabPanel>
                    <HeadersSection id={id} />
                </TabPanel>
                <TabPanel>
                    <BodySection id={id} />
                </TabPanel>
            </TabPanels>
        </Tabs>
        <ResponseSection id={id} />
    </>)
}

export default RequestTab