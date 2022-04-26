import { Box, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import RequestTab from './components/RequestTab';

type RequestTabProps = {
    title: string
}

const Main = () => {
    const [tabs, setTabs] = useState<RequestTabProps[]>([{ title: 'New Request 1' }]);

    const createNewRequest = () => {
        setTabs([...tabs, { title: `New Request ${tabs.length + 1}` }])
    }

    return (
        <Box padding={'15px'}>
            <Tabs>
                <TabList>
                    {tabs.map(tab => <Tab>{tab.title}</Tab>)}
                    <Tab onClick={createNewRequest}><IconButton aria-label='create new request' icon={<AddIcon />} /></Tab>
                </TabList>
                <TabPanels>
                    {tabs.map(() => {
                        return <TabPanel>
                            <RequestTab />
                        </TabPanel>
                    })}
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Main