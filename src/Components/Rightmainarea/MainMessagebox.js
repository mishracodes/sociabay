import React, { useContext, useEffect } from "react";
import "./MainMessagebox.css";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton, Tooltip } from "@mui/material";
import { collection,addDoc } from "firebase/firestore";
import db, {storage}  from "../../firebase";
import mainContext from "../../Context/mainContext";
import {stateToHTML} from 'draft-js-export-html';
import Draft, { Editor, EditorState } from "draft-js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import SendIcon from '@mui/icons-material/Send';

const MainMessagebox = ({id,username}) => {
  const context = useContext(mainContext)
  const {currentHashId,toggleEmoji,message,setmessage,lastseenStatus,attachment, sendIconChange, setSendIconChange,attachfileUpload, attachToggle,attachedfiletype,attachedthumb,attachedfilesize,attachedfilename}=context;
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

useEffect(() => {

  if(stateToHTML(editorState.getCurrentContent())!=='<p><br></p>'){
    setSendIconChange(true)
  }
  else{
    setSendIconChange(false)
  }

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
    const msgRef = collection(db, "Chats", currentHashId, "message");
    if (attachfileUpload == null){
      addDoc(msgRef, { mName:username,mRead:false,mRecieved: lastseenStatus==='Online'?true:false,mText:msg,mTimestamp:new Date(),mMedia: {} });
    }
    else{
    const attachRef = ref(storage, `attachment/${currentHashId}/${attachfileUpload.name + v4()}`);
    uploadBytes(attachRef, attachfileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(msgRef, { mName:username,mRead:false,mRecieved: lastseenStatus==='Online'?true:false,mText:msg,mTimestamp:new Date(),mMedia: {url: url, mType: attachedfiletype, mThumb: attachedthumb, mName: attachedfilename,mSize: attachedfilesize} });
      });
    })
    attachToggle() 
  }
  
  };
  const formSubmitHandler = (e) => {
    sendMessage(message);
    setEditorState(() => EditorState.createEmpty())
  };
  return (
    <div className="messageBox__container">
      <IconButton onClick={toggleEmoji}>
        <TagFacesIcon className="buttonColor" />
      </IconButton>
      <label htmlFor="attachInput">
        <input style={{display: "none"}} onChange={attachment} type="file" id='attachInput'/> 
      <Tooltip title='Attach'>
        <IconButton component='span'>
        <AttachmentIcon className="messageBox__attachment buttonColor" />
        </IconButton>
      </Tooltip>
      </label>
      
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
      {sendIconChange?<IconButton onClick={formSubmitHandler}><SendIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton>:<IconButton ><MicIcon sx={{ color: "rgb(117,132,142)" }}/></IconButton>}
    </div>
  );
};

export default MainMessagebox;
