import { Box, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { SmallAddIcon } from '@chakra-ui/icons';
import RequestTab from './components/RequestTab';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './features/store';
import { addRequest } from './features/requestsSlice';
import getUniqueId from './utils/getUniqueId';
import { RequestType, Request } from './types';

const Main = () => {

    const requests = useSelector((state: RootState) => state.requests);
    const dispatch = useDispatch();

    const createNewRequest = () => {
        const newRequestData: Request = {
            id: getUniqueId(),
            title: `Request ${requests.length + 1}`,
            url: '',
            type: RequestType.get,
            params: [
                { paramId: getUniqueId(), key: '', value: '' }
            ],
            headers: [
                { headerId: getUniqueId(), key: '', value: '' }
            ],
            body: ''
        };
        dispatch(addRequest(newRequestData));
    }

    return (
        <Box padding={'15px'}>
            <Tabs>
                <TabList>
                    {requests.map(request => <Tab key={request.id} >{request.title}</Tab>)}
                    <Tab onClick={createNewRequest}><IconButton aria-label='create new request' icon={<SmallAddIcon />} /></Tab>
                </TabList>
                <TabPanels>
                    {requests.map((request) => {
                        return <TabPanel key={request.id}>
                            <RequestTab id={request.id} url={request.url} type={request.type} />
                        </TabPanel>
                    })}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Main