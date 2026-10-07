import { useRef } from 'react'
import axios from "axios"
import './App.css'

function App() {

    const inputRef = useRef(null)
    

 async function handleFile(e){

    if(e.target.files.length === 0){
      inputRef.current.value = null
      return alert("Please select a file")
    }
  
    const selectedFile = e.target.files[0]
    console.log(selectedFile.name)
    console.log(selectedFile.size)
    console.log(selectedFile.type)
    
    if (selectedFile.type!== "application/pdf") {
      inputRef.current.value = null
      return alert("please select correct file type")
    }
  

    const maxSize = 5*1024*1024
    if(selectedFile.size > maxSize){
      inputRef.current.value = null
      return alert("File size must be 5 MB or less")
    }
    const formData = new FormData()

    formData.append("resume",selectedFile)
    console.log(formData.get('resume'))
    console.log(formData)

    const response = await axios.post("/api/v1/user/resume", formData)
    return response.data

  }

  return (
    <>
    <h1>File Upload Practice</h1>
    <input type="file"
      ref={inputRef}
      onChange={handleFile}
    />
    </>
  )
}

export default App
