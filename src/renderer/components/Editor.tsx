import React, { useEffect, useRef } from 'react'
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

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

    return (
        <div ref={container} />
    )
}

export default Editor