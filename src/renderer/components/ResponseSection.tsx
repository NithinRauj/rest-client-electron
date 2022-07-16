import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setResponse } from '../features/requestsSlice';
import { RootState } from '../features/store';
import Editor from './Editor';

type ResponseSectionProps = {
    id: string
};

const ResponseSection = ({ id }: ResponseSectionProps) => {

    const response = useSelector((state: RootState) => state.requests.find(r => r.id == id).response);
    const dispatch = useDispatch();

    const onChange = (data: string) => {
        dispatch(setResponse({ id, data }));
    }

    const useGreenText = response?.statusCode && response.statusCode.toString().startsWith('2');

    return (
        <Box borderTop={'1px solid #919191'}>
            <Flex marginBottom={'10'} justifyContent={'space-between'}>
                <Heading size='md'>Response</Heading>
                <Flex w={'lg'} justifyContent={'space-between'}>
                    <Box>
                        <Text as={'b'}>Status Code</Text>
                        <Text color={response.data ? (useGreenText ? 'green' : 'red') : 'white'}>{response.statusCode || '-'}</Text>
                    </Box>
                    <Box>
                        <Text as={'b'}>Status Text</Text>
                        <Text color={response.data ? (useGreenText ? 'green' : 'red') : 'white'}>{response.statusText || '-'}</Text>
                    </Box>
                    <Box>
                        <Text as={'b'}>Time</Text>
                        <Text>{response.responseTime || '-'}</Text>
                    </Box>
                </Flex>
            </Flex>
            <Editor onJSONChange={onChange} json={response.data} />
        </Box>
    )
}

export default ResponseSection