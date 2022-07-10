import { Button, Flex, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteRequest, setRequestType, setUrl } from '../features/requestsSlice';
import { RequestType } from '../types';
import BodySection from './BodySection';
import HeadersSection from './HeadersSection';
import ParamsSection from './ParamsSection';
import ResponseSection from './ResponseSection';

type RequestTabProps = {
    id: string,
    url: string,
    type: string
}

const RequestTab = ({ id, url, type }: RequestTabProps) => {

    const dispatch = useDispatch();

    const handleDeleteRequest = () => {
        dispatch(deleteRequest(id));
    }

    const onChangeRequestType = (type: RequestType) => {
        dispatch(setRequestType({ id, type }));
    }

    const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUrl({ id, url: e.target.value }));
    }

    return (<>
        <Flex marginBottom={5}>
            <Select size='md' width={'165px'} borderTopRightRadius={'0px'}
                borderBottomRightRadius={'0px'}
                defaultValue={type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeRequestType(e.target.value as RequestType)}
            >
                <option value='post'>POST</option>
                <option value='get'>GET</option>
                <option value='put'>PUT</option>
                <option value='patch'>PATCH</option>
                <option value='delete'>DELETE</option>
            </Select>
            <Input placeholder='https://api.dev.com' borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} value={url} onChange={onChangeUrl} />
            <Button colorScheme={'green'} marginLeft={'10px'}>Send</Button>
        </Flex>
        <Button colorScheme={'red'} variant={'outline'} onClick={handleDeleteRequest} size={'md'} borderRadius={'5px'} marginLeft={'5px'}>Delete</Button>
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