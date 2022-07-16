import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { RootState } from '../features/store';
import { useDispatch, useSelector } from 'react-redux';
import { addParam, removeParam, updateParam } from '../features/requestsSlice';

type ParamsSectionProps = {
    id: string
}

const ParamsSection = ({ id }: ParamsSectionProps) => {

    const dispatch = useDispatch();

    const request = useSelector((state: RootState) => state.requests.find((req) => req.id == id));

    const addNewParam = () => {
        dispatch(addParam({ requestId: id }));
    }

    const deleteParam = (paramId: string) => {
        dispatch(removeParam({ requestId: id, paramId }));
    }

    const setParam = (paramId: string, type: 'key' | 'value', value: string) => {
        dispatch(updateParam({ requestId: id, paramId, type, value }));
    }

    return (
        <Box height={'280'} overflowX={'hidden'} overflowY={'auto'} padding={'0px 10px'}>
            <Text>Params</Text>
            <Button colorScheme={'green'} margin={'10px 0px'} onClick={addNewParam}>Add Param</Button>
            <Box flexDirection={'column'}>
                {request.params.map((config) => {
                    return <Flex margin={'5px 0px'} key={config.paramId}>
                        <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderColor={'#303030'} >
                            <Input placeholder='Some key' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.key} onChange={(e) => setParam(config.paramId, 'key', e.target.value)} />
                        </Box>
                        <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderColor={'#303030'} >
                            <Input placeholder='Some value' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.value} onChange={(e) => setParam(config.paramId, 'value', e.target.value)} />
                        </Box>
                        <Button colorScheme={'red'} onClick={() => deleteParam(config.paramId)} size={'md'} borderRadius={'5px'} marginLeft={'5px'}>Delete</Button>
                    </Flex>
                })}
            </Box>
        </Box>
    )
}

export default ParamsSection