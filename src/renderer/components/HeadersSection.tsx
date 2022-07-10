import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { RootState } from '../features/store';
import { useDispatch, useSelector } from 'react-redux';
import { addHeader, removeHeader, updateHeader } from '../features/requestsSlice';

type HeadersSectionProps = {
    id: string
}

const HeadersSection = ({ id }: HeadersSectionProps) => {

    const dispatch = useDispatch();

    const request = useSelector((state: RootState) => state.requests.find((req) => req.id == id));

    const addNewHeader = () => {
        dispatch(addHeader({ requestId: id }));
    }

    const deleteHeader = (headerId: string) => {
        dispatch(removeHeader({ requestId: id, headerId }));
    }

    const setHeader = (headerId: string, type: 'key' | 'value', value: string) => {
        dispatch(updateHeader({ requestId: id, headerId, type, value }));
    }

    return (
        <Box height={'280'} overflowX={'hidden'} overflowY={'auto'} padding={'0px 10px'}>
            <Text>Headers</Text>
            <Button colorScheme={'green'} margin={'10px 0px'} onClick={addNewHeader}>Add Param</Button>
            <Box flexDirection={'column'}>
                {request.headers.map((config) => {
                    return <Flex margin={'5px 0px'} key={config.headerId}>
                        <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderColor={'#303030'} >
                            <Input placeholder='Some key' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.key} onChange={(e) => setHeader(config.headerId, 'key', e.target.value,)} />
                        </Box>
                        <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderColor={'#303030'} >
                            <Input placeholder='Some value' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.value} onChange={(e) => setHeader(config.headerId, 'value', e.target.value)} />
                        </Box>
                        <Button colorScheme={'red'} variant={'outline'} onClick={() => deleteHeader(config.headerId)} size={'md'} borderRadius={'5px'} marginLeft={'5px'}>Delete</Button>
                    </Flex>
                })}
            </Box>
        </Box>
    )
}

export default HeadersSection