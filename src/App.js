import React, {useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'

function App() {
  const [trimmedDataURL,setTrimmedDataURL] = useState('');
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);
 let sigPad = {}

 const clear = () => {
   if (JSON.stringify(sigPad)!=='{}') {
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
 console.log(trimmedDataURL);

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
         <SignatureCanvas penColor='black'
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
        backgroundColor="rgba(0,0,0,.1)"
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

    </div>

  );
}
const styles = {
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:50
  },
  signatureContainer:{
    width:500,
    height:200,
    marginLeft:50
  },
  emptyMessage:{
    color:'red',
    fontSize:18,
    textAlign:'center'
  }
}

export default App;
