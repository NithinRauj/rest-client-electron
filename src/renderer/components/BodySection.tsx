import React, { useEffect, useState } from 'react';
import Editor from './Editor';

const Body = () => {

    const [json, setJson] = useState<string>(null);

    const onChange = (value: string) => {
        setJson(value);
    }

    return (
        <div>
            <Editor onJSONChange={onChange} json={json} />
        </div>
    )
}

export default Body