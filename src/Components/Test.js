import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import {stateToHTML} from 'draft-js-export-html';
import parse from 'html-react-parser';
const Test = () => {
  const [html, sethtml] = useState("")
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const onCHangeHandler=(state)=>{
    setEditorState(state)
    let htm = stateToHTML(editorState.getCurrentContent());
    console.log(htm);
    sethtml(htm)
  }
  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div
    style={{ width:'40vw', hright:'40vh' }}
  >
    <div style={{ backgroundColor:'white', color:'black', border: "2px solid black", minHeight: "6em", cursor: "text",width:'800px', hright:'300px' }}
    onClick={focusEditor}>
    <Editor
      ref={editor}
      editorState={editorState}
      onChange={onCHangeHandler}
      placeholder="Type a message..."
    />
    </div>
    

    <p>-=---------------------------------------------------------------------------------------</p>
    <div>{parse(html)}</div>
  </div>
  )
}
export default Test