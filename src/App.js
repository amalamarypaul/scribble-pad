import React, {useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SketchPicker } from 'react-color';

function App() {
  const [trimmedDataURL,setTrimmedDataURL] = useState('');
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);
  const [signColor, setSignColor]=useState('black');
  const [showPicker, setPickerVisibility]=useState(false);
  const [colorType, setColorType] = useState('pen');
  const [canvasColor, setCanvasColor] = useState('white');
 let sigPad = {}

 const clear = () => {
   if (Object.keys(sigPad).length===0) {
     sigPad={}
   }else{
     sigPad.clear()
   }
   setTrimmedDataURL('');
 }

 const preview = () => {
   if (sigPad.isEmpty()) {
    setIsEmptyMessage(true);
   } else {
     setIsEmptyMessage(false);
     setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
   }

 }
 const handleChangeComplete = (color) => {
   if (colorType==='pen') {
     setSignColor(color.hex);
   } else {
     setCanvasColor(color.hex)
   }
setPickerVisibility(false);
 };
const showColorPicker = ({ type })=>{
  setPickerVisibility(true);
  setColorType(type)
}
  return (
    <div style={styles.container}>
      <div>
        {
          isEmptyMessage ?<p style={ styles.emptyMessage}> Please scribble something</p>:null
        }
     {
       trimmedDataURL?
       <img src={trimmedDataURL} style={ styles.signatureContainer}/>
       :
       <div>
         <SignatureCanvas penColor={signColor}
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
        backgroundColor={canvasColor}
        ref={(ref) => {
          sigPad = ref }}
      />
       </div>

     }
      </div>
      {
        trimmedDataURL?
          <a href={trimmedDataURL} title='download'>download</a>
        :
        <button onClick={preview}>
               preview
       </button>

      }
      <button onClick={clear}>
             clear
     </button>
     <button onClick={()=>{showColorPicker({type:'pen'})}}>
          Change pen color
    </button>
    <button onClick={()=>{showColorPicker({type:'canvas'})}}>
         Change background color
   </button>
   {
     showPicker?
     <SketchPicker
         color={ signColor }
         onChangeComplete={ handleChangeComplete }
       />:null

   }


    </div>

  );
}
const styles = {
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:50,
    backgroundColor:'rgba(0,0,0,.1)',
    height:670
  },
  signatureContainer:{
    width:500,
    height:200,
    //marginLeft:50
  },
  emptyMessage:{
    color:'red',
    fontSize:18,
    textAlign:'center'
  }
}

export default App;
