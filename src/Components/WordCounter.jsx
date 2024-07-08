import React, { useState } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WordCounter = () => {

    const [text, setText] = useState('');

    const handleUpper = () => {
        setText(text.toUpperCase());

    }
    const handleLower = () => {
        setText(text.toLowerCase());

    }
    const handleExtraSpace = () => {
        const newText = text.split(/[ ]+ /);
        setText(newText.join(' '));
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip
            });

    }
    const handleClear = () => {
        setText('');

    }


    const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    }

    return (
        <div className='bg-gray-200/50 flex flex-col justify-center items-center xl:px-64 lg:px-48 md:px-32 sm:px-16 px-5 py-12 sm:py-12 lg:py-16'>
            <h1 className='xl:text-9xl lg:text-8xl md:text-6xl sm:text-5xl text-3xl font-semibold'><span className='text-red-500'>W</span>o<span className='text-red-500'>r</span>d <span className='text-red-500'>C</span>o<span className='text-red-500'>u</span>n<span className='text-red-500'>t</span>e<span className='text-red-500'>r</span></h1>
            <div className='flex justify-evenly items-center lg:gap-10 sm:gap-4 gap-2 w-full mt-20 mb-3 flex-wrap'>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-red-300 px-6 py-1 rounded-lg'>
                    Words : {text.split(' ').length - 1}
                </div>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-red-300 px-6 py-1 rounded-lg'>
                    Characters : {text.length}
                </div>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-red-300 px-6 py-1 rounded-lg'>
                    Time : {0.005 * text.length}
                </div>
            </div>
            <textarea onChange={handleChange} value={text} placeholder='Write your text here' className='font-sans border-2 border-black p-3 my-4 w-full rounded-2xl h-72 outline-red-500 shadow-xl'>

            </textarea>
            <div className='flex justify-evenly items-center lg:gap-10 sm:gap-4 gap-2 w-full mt-8 flex-wrap'>
                <button onClick={handleUpper} className='border-2 border-red-500 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-red-300 hover:bg-white shadow-lg'>Upper Case</button>
                <button onClick={handleLower} className='border-2 border-red-500 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-red-300 hover:bg-white shadow-lg'>Lower Case</button>
                <button onClick={handleExtraSpace} className='border-2 border-red-500 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-red-300 hover:bg-white shadow-lg'>Remove Extra Spaces</button>
                <button onClick={handleCopy} className='border-2 border-red-500 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-red-300 hover:bg-white shadow-lg'>Copy Text</button>
                <button onClick={handleClear} className='border-2 border-red-500 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-red-300 hover:bg-white shadow-lg'>Clear Text</button>
                
            </div>
            <ToastContainer/>
        </div>
    )
}

export default WordCounter