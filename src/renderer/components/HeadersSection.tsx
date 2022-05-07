import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

export type Param = {
    index: number,
    key: string,
    value: string
}


const ParamsSection = () => {

    const [paramsList, setParamsList] = useState<Param[]>([{ index: 0, key: '', value: '' }]);

    const addNewParam = () => {
        setParamsList([...paramsList, { index: paramsList.length, key: '', value: '' }]);
    }

    const deleteParam = (index: number) => {
        setParamsList(paramsList.filter(p => p.index !== index));
    }

    const setParam = (index: number, value: string, type: string) => {
        const params = paramsList;
        const updatedParams = params.map(obj => {
            return obj.index === index ? { ...obj, [type]: value } : obj;
        });
        console.log(updatedParams);
        setParamsList(updatedParams);
    }

    return (
        <>
            <Box h={'sm'} >
                <Text>Headers</Text>
                <Button colorScheme={'green'} margin={'10px 0px'} onClick={addNewParam}>Add Param</Button>
                <Box h={'sm'} overflowX={'hidden'} overflowY={'auto'} flexDirection={'column'}>
                    {paramsList.map((config) => {
                        return <Flex margin={'5px 0px'}>
                            <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderRadius={'5px 0px 0px 5px'} borderColor={'#303030'} >
                                <Input placeholder='Some key' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.key} onChange={(e) => setParam(config.index, e.target.value, 'key')} />
                            </Box>
                            <Box w={'lg'} maxW={'lg'} height={'40px'} borderWidth={1} borderColor={'#303030'} >
                                <Input placeholder='Some value' border={'none'} height={'40px'} focusBorderColor={'transparent'} value={config.value} onChange={(e) => setParam(config.index, e.target.value, 'value')} />
                            </Box>
                            <Button colorScheme={'red'} onClick={() => deleteParam(config.index)} size={'md'} borderRadius={'0px 5px 5px 0px'}>Delete</Button>
                        </Flex>
                    })}
                </Box>
            </Box>

        </>
    )
}

export default ParamsSection