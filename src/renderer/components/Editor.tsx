import React, { useEffect, useRef } from 'react'
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import '../css/app.css';

type EditorProps = {
    json: string
    onJSONChange: (value: string) => void
}

const Editor = ({ json, onJSONChange }: EditorProps) => {

    const editor = useRef<JSONEditor>(null);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        editor.current = new JSONEditor(container.current, { mode: 'code', mainMenuBar: false, onChangeText: onJSONChange }, json);
    }, []);

    useEffect(() => {
        editor.current && editor.current.updateText(json);
    }, [json]);

    return (
        <div id='json-editor'>
            <div ref={container} />
        </div>
    )
}

export default Editor