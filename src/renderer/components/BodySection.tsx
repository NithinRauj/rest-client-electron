import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBodyJson } from '../features/requestsSlice';
import { RootState } from '../features/store';
import Editor from './Editor';

type BodySectionProps = {
    id: string
}

const BodySection = ({ id }: BodySectionProps) => {

    const request = useSelector((state: RootState) => state.requests.find(r => r.id == id));
    const dispatch = useDispatch();

    const onChange = (value: string) => {
        dispatch(setBodyJson({ id, body: value }));
    }

    return (
        <Box height={'280'}>
            <Editor onJSONChange={onChange} json={request.body} />
        </Box>
    )
}

export default BodySection