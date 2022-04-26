import { Button, Flex, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';


const RequestTab = () => {
    return (<>
        <Flex>
            <Select size='md' width={'165px'} borderTopRightRadius={'0px'} borderBottomRightRadius={'0px'}>
                <option value='post'>POST</option>
                <option value='get'>GET</option>
                <option value='put'>PUT</option>
                <option value='patch'>PATCH</option>
                <option value='delete'>DELETE</option>
            </Select>
            <Input placeholder='https://api.dev.com' borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} />
            <Button colorScheme={'green'} marginLeft={'10px'}>Send</Button>
        </Flex>
        <Tabs>
            <TabList>
                <Tab>Params</Tab>
                <Tab>Authorizations</Tab>
                <Tab>Headers</Tab>
                <Tab>Body</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Params section</TabPanel>
                <TabPanel>Authorizations section</TabPanel>
                <TabPanel>Headers section</TabPanel>
                <TabPanel>Body section</TabPanel>
            </TabPanels>
        </Tabs>
    </>)
}

export default RequestTab