import { useState, useCallback, useEffect, useRef } from 'react'
import './index.css'

function App() {

  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");
  const [copied, setcopied] = useState(false);

  //useRef hook
  const passwordref = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
              if(numberallowed) str += "0123456789"
              if(character) str+= "~`!@#$%^&*()[]{}<>?"

              for(let i=1; i<=length; i++){
                let char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char)
              }

              setpassword(pass);
  }, [length, numberallowed, character, setpassword]) //setpassword is for optimation or by memozation it is optional

    const copypasswordtoclipboard = useCallback(() => {
      passwordref.current?.select();
      passwordref.current?.setSelectionRange(0, 15)
      window.navigator.clipboard.writeText(password)
      setcopied(true);

      setTimeout(() => {
        setcopied(false);
      },1000)
    }, [password])

    useEffect(() => {
      passwordgenerator()
    }, [length, numberallowed, character, passwordgenerator ]) 

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center mb-3 font-semibold font-stretch-50%'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white text-gray-500 font-stretch-50% font-semibold'
            placeholder='Password'
            readOnly
            ref = {passwordref}
            />
            <button 
            onClick={copypasswordtoclipboard} 
            
            className={`outline-none bg-blue-500 p-2 cursor-pointer text-white font-semibold shrink-0 duration-400 ${copied ? "bg-green-600 scale-105" : "bg-blue-500 hover:bg-blue-800"}`}>{copied ? "🎉 Copied" : "Copy"}</button>
      </div>

        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-grabbing mx-2'
              onChange={(e) => {setlength(e.target.value)}}
                />
                <label>Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
                    defaultChecked = {numberallowed}
                    id='numberinput'
                    onChange={() => {
                      setnumberallowed((prev) => !prev)
                    }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <input type="checkbox" 
                  defaultChecked = {character}
                  id='charinput'
                  onChange={() => {
                    setcharacter((prev) => !prev)
                  }}
            />
            <label htmlFor="Charinput">Character</label>

        </div>

    </div>
  )
}

export default App
