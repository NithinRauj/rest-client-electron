import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setJsonBody } from '../features/requestsSlice';
import { RootState } from '../features/store';
import Editor from './Editor';

type ResponseSectionProps = {
    id: string
};

const ResponseSection = ({ id }: ResponseSectionProps) => {

    const json = useSelector((state: RootState) => state.requests.find(r => r.id == id).body);
    const dispatch = useDispatch();

    const onChange = (body: string) => {
        dispatch(setJsonBody({ id, body }));
    }

    return (
        <Box borderTop={'1px solid #919191'}>
            <Flex marginBottom={'10'} justifyContent={'space-between'}>
                <Heading size='md'>Response</Heading>
                <Flex w={'sm'} justifyContent={'space-between'}>
                    <Box>
                        <Text as={'b'}>Status </Text>
                        <Text>200</Text>
                    </Box>
                    <Box>
                        <Text as={'b'}>Time</Text>
                        <Text>22 ms</Text>
                    </Box>
                    <Box>
                        <Text as={'b'}>Size</Text>
                        <Text>462 B</Text>
                    </Box>
                </Flex>
            </Flex>
            <Editor onJSONChange={onChange} json={json} />
        </Box>
    )
}

export default ResponseSection