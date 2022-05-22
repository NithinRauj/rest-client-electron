import { Box, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import RequestTab from './components/RequestTab';
import { StoreContext } from './context/StoreContext';
import actionTypes from './actionTypes';

const Main = () => {

    const { appState, dispatch } = React.useContext(StoreContext);
    const { requests } = appState;
    const tabs = Object.keys(requests);

    const createNewRequest = () => {
        dispatch({ type: actionTypes.CREATE_REQUEST, payload: { newTabId: tabs.length + 1 } });
    }

    return (
        <Box padding={'15px'}>
            <Tabs>
                <TabList>
                    {tabs.map(tabId => <Tab>{requests[tabId].title}</Tab>)}
                    <Tab onClick={createNewRequest}><IconButton aria-label='create new request' icon={<AddIcon />} /></Tab>
                </TabList>
                <TabPanels>
                    {tabs.map((tabId) => {
                        return <TabPanel>
                            <RequestTab id={tabId} />
                        </TabPanel>
                    })}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Main