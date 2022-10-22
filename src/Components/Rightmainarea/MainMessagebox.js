import React, { useContext, useEffect } from "react";
import "./MainMessagebox.css";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";
import { collection,addDoc } from "firebase/firestore";
import db from "../../firebase";
import mainContext from "../../Context/mainContext";
import {stateToHTML} from 'draft-js-export-html';
import Draft, { Editor, EditorState } from "draft-js";


const MainMessagebox = ({id,username}) => {
  const context = useContext(mainContext)
  const {currentHashId,toggleEmoji,message,setmessage,lastseenStatus}=context;
  const [editorState, setEditorState] = React.useState(() =>
  EditorState.createEmpty()
);
const onCHangeHandler=(state)=>{
  setEditorState(state)
}
useEffect(() => {
  setmessage(stateToHTML(editorState.getCurrentContent()))
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [editorState])

function keyBindingFn(e) {
  if (e.key === 'Enter') {
    return 'submitform' // name this whatever you want
  }

  // This wasn't the delete key, so we return Draft's default command for this key
  return Draft.getDefaultKeyBinding(e)
}
function handleKeyCommand(command) {
  if (command === 'submitform') {
    formSubmitHandler()
    setEditorState(() =>
    EditorState.createEmpty())
    // Do what you want to here, then tell Draft that we've taken care of this command
    return 'handled'
  }

  // This wasn't the 'delete-me' command, so we want Draft to handle it instead. 
  // We do this by telling Draft we haven't handled it. 
  return 'not-handled'
}
  // const messageChnageHandler = (e) => {
  //   e.preventDefault();
  //   setmessage(e.target.value);
  // };
  const sendMessage = (msg) => {
     addDoc(collection(db, "Chats", currentHashId, "message"),{mName:username,mRead:false,mRecieved: lastseenStatus==='Online'?true:false,mText:msg,mTimestamp:new Date(),mMedia:""});
    
  };
  const formSubmitHandler = (e) => {
    sendMessage(message);
    setmessage("");
  };
  return (
    <div className="messageBox__container">
      <IconButton onClick={toggleEmoji}>
        <TagFacesIcon className="buttonColor" />
      </IconButton>
      <IconButton>
        <AttachmentIcon className="messageBox__attachment buttonColor" />
      </IconButton>
      <form className="messageBox__form" onSubmit={formSubmitHandler}>
        <Editor
          // type="text"
          // value={message}
          // onChange={messageChnageHandler}
          // ref={editor}
          keyBindingFn={keyBindingFn}
  handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onCHangeHandler}
          placeholder="Type a message..."
        />
      </form>
      <IconButton>
        <MicIcon className="buttonColor" />
      </IconButton>
    </div>
  );
};

export default MainMessagebox;
