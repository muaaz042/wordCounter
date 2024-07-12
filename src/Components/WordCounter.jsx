import React, { useState, useEffect, useRef } from 'react';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WordCounter = () => {
    const [text, setText] = useState('');
    const [time, setTime] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isTyping) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isTyping && time !== 0) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isTyping]);

    const handleUpper = () => {
        setText(text.toUpperCase());
    };

    const handleLower = () => {
        setText(text.toLowerCase());
    };

    const handleExtraSpace = () => {
        const newText = text.split(/[ ]+/).join(' ');
        setText(newText);
    };

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
            transition: Flip,
        });
    };

    const handleClear = () => {
        setText('');
        setTime(0);
    };

    const handleChange = (e) => {
        setText(e.target.value);
        setIsTyping(true);
    };

    useEffect(() => {
        if (text === '') {
            setIsTyping(false);
        } else {
            const typingTimeout = setTimeout(() => {
                setIsTyping(false);
            }, 1000);

            return () => clearTimeout(typingTimeout);
        }
    }, [text]);

    const countWords = (text) => {
        return text.split(/\s+/).filter(word => word.trim().length > 0).length;
    };

    const countParagraphs = (text) => {
        return text.split('\n').filter(paragraph => paragraph.trim().length > 0).length;
    };

    return (
        <div className='flex flex-col justify-center items-center xl:px-64 lg:px-48 md:px-32 sm:px-16 px-5 py-12 sm:py-12 lg:py-16 font-mono'>
            <img src="./logo.png" alt="logo" className='w-80' />
            <div className='flex justify-evenly items-center lg:gap-10 sm:gap-4 gap-2 w-full mt-20 mb-3 flex-wrap'>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-purple-300 px-6 py-1 rounded-lg'>
                    Words : {countWords(text)}
                </div>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-purple-300 px-6 py-1 rounded-lg'>
                    Characters : {text.length}
                </div>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-purple-300 px-6 py-1 rounded-lg'>
                    Paragraphs : {countParagraphs(text)}
                </div>
                <div className='bg-white shadow-lg hover:shadow-none hover:bg-purple-300 px-6 py-1 rounded-lg'>
                    Timer : {time} s
                </div>
            </div>
            <textarea
                onChange={handleChange}
                value={text}
                placeholder='Write your text here'
                className='border-2 border-black p-3 my-4 w-full rounded-2xl h-72 outline-purple-500 shadow-xl'
            ></textarea>
            <div className='flex justify-evenly items-center lg:gap-10 sm:gap-4 gap-2 w-full mt-8 flex-wrap'>
                <button onClick={handleUpper} className='border-2 border-purple-300 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-purple-300 hover:bg-white shadow-lg'>UPPER CASE</button>
                <button onClick={handleLower} className='border-2 border-purple-300 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-purple-300 hover:bg-white shadow-lg'>lower case</button>
                <button onClick={handleCopy} className='border-2 border-purple-300 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-purple-300 hover:bg-white shadow-lg'>Copy Text</button>
                <button onClick={handleExtraSpace} className='border-2 border-purple-300 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-purple-300 hover:bg-white shadow-lg'>Remove Extra Spaces</button>
                
                <button onClick={handleClear} className='border-2 border-purple-300 lg:px-6 md:px-4 sm:px-2 px-1 md:py-1 py-0 rounded-xl bg-purple-300 hover:bg-white shadow-lg'>Clear Text</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WordCounter;
