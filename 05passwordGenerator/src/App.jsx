import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNIOPQRSTUVWXYZabcdefghijklmniopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}[]~`"

    for(let i=0; i<length; i++)
    {
      let randomIdx = Math.floor(Math.random()*str.length)
      pass += str.charAt(randomIdx)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 bg-white text-gray-800 rounded"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-orange-600 hover:scale-105 active:bg-orange-700 active:scale-95 
                 transition duration-200 ease-in-out'
            onClick={copyPasswordToClipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default App
