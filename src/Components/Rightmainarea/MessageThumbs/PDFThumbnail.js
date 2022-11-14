import React from 'react'
import './PDFThumbnail.css'
import pdficon from '../../../Assets/filepdficon.png'

const PDFThumbnail = ({thumbsrc,name,size,type}) => {
    console.log(name,size,type);
  return (
    <div className='thumb__main'>
        <div className="pdf__thumb__container">
          <img src={thumbsrc} alt="" className="pdf__thumb"/>
        </div>
        <div className='pdf__thumb_filename'>
                <img src={pdficon} alt="" width="26px"/>
                <p>{name}</p>
        </div>
        <div className='pdf__thumb_details'>
                <p>{parseInt(size)} kB</p> 
                <p> - </p>
                <p>{type}</p>
        </div>

    </div>
  )
}

export default PDFThumbnail