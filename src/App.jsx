import React, { useState } from 'react'
import axios from "axios"
const App = () => 
  {

const[question,setQuestion] = useState("");
const[answer,setAnswer] = useState(" ");

const handleQuestionChange = (event) => {
setQuestion(event.target.value)
}

const handleAnswerChange = (ans) => {
  setAnswer(ans)
  }


async function generateAnswer(){
  setAnswer("Loading...");
  
  const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key= AIzaSyAFBOAHecqHR--c4KIQK-ad6enut0l4lRs" ,
    method: "post" , 
    data: {"contents":[{"parts":[{"text":question}]}]}    

  });
  console.log(        response["data"]["candidates"][0]["content"]["parts"][0]["text"]  );
  const a = response.data.candidates[0].content.parts[0].text;

    // Format the answer, replacing line breaks with <br/> and wrapping with <strong> where necessary
    const formattedAnswer = a
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold formatting
      .replace(/\n/g, '<br/>') // Line breaks
      .replace(/(^|\s)\*(.*?)\*/g, '$1• $2'); // Replace single * with bullet point

    handleAnswerChange(`Answer fetched from Gemini Generative Lang Model is:<br/> ${formattedAnswer}`);
 
  }


  return (
    <>
        <div className='container'>

  <div className='main-div'>
    <h1 className='main-heading'>AI Support Chatbot</h1>  <br/> 
    <textarea  value={question} onChange={handleQuestionChange} className='question-input' placeholder='Ask me anything'/> <br/> <br/> <br/>
    <button onClick={generateAnswer} className='ans-btn'>Get an Answer</button>


    </div>
        <section className='ans-para' dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
</>
   )
}

export default App