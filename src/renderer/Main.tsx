import { Box, Flex, Heading, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MoonIcon, SmallAddIcon, SunIcon } from '@chakra-ui/icons';
import RequestTab from './components/RequestTab';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './features/store';
import { addRequest } from './features/requestsSlice';
import getUniqueId from './utils/getUniqueId';
import { RequestType, Request } from './types';
import loadInterceptors from './utils/loadInterceptors';

const Main = () => {

    const requests = useSelector((state: RootState) => state.requests);
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        // Intercepts requests and responses to calculate response time
        loadInterceptors();
    }, [])

    const createNewRequest = () => {
        const newRequestData: Request = {
            id: getUniqueId(),
            title: `Request ${requests.length + 1}`,
            url: '',
            type: RequestType.get,
            params: [],
            headers: [],
            body: '',
            response: { data: '' },
            loading: false
        };
        dispatch(addRequest(newRequestData));
    }

    const onTabIndexChange = (id: string) => {
        const index = requests.findIndex((r) => r.id === id);
        if (index) {
            handleTabsChange(index == 0 ? 0 : index - 1);
        }
    }

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    }

    return (
        <Box padding={'15px'}>
            <Flex justifyContent={'space-between'} margin={'10px 0px'}>
                <Heading size='lg'>REST Client</Heading>
                {colorMode == 'dark' ? <MoonIcon boxSize={'20px'} onClick={toggleColorMode} /> : <SunIcon onClick={toggleColorMode} boxSize={'25px'} />}
            </Flex>

            <Tabs index={tabIndex} onChange={handleTabsChange}>
                <TabList>
                    {requests.map(request => <Tab key={request.id} >{request.title}</Tab>)}
                    <Tab onClick={createNewRequest}><IconButton aria-label='create new request' icon={<SmallAddIcon />} /></Tab>
                </TabList>
                <TabPanels>
                    {requests.map((request) => {
                        return <TabPanel key={request.id}>
                            <RequestTab id={request.id} onTabChange={onTabIndexChange} />
                        </TabPanel>
                    })}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Main