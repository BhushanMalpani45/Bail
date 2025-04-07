import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const LegalQuery = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    async function generateAnswer(e) {
        e.preventDefault();
        setGeneratingAnswer(true);
        setAnswer("Loading your answer... \n It might take up to 10 seconds");

        const isLegalQuery = /(law|legal|police|judge|lawyer|undertrial prisoner|court|trial|bail|attorney|jurisdiction|crime|offense|verdict|case)/i.test(question);
        if (!isLegalQuery) {
            setAnswer("Please ask a question related to the legal system (e.g., law, police, judge, lawyer, undertrial prisoner).");
            setGeneratingAnswer(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
                {
                    contents: [{ parts: [{ text: `Please provide a short and precise answer related to the legal system: ${question}` }] }],
                },
                {
                    params: {
                        key: 'AIzaSyCqXgBJ1nCTp1r_Oq4m2HFB1Dk3rvygqGQ' 
                    }
                }
            );

            if (response.data && response.data.candidates && response.data.candidates[0]) {
                setAnswer(response.data.candidates[0].content.parts[0].text);
            } else {
                setAnswer("Sorry, I couldn't generate an answer.");
            }
        } catch (error) {
            console.log(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        } finally {
            setGeneratingAnswer(false);
        }
    }

    return (
        <>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-10 flex flex-col justify-center items-center overflow-auto">
                <form
                    onSubmit={generateAnswer}
                    className="w-full  lg:w-3/3 xl:w-2/2 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
                >
                    <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer">
                        <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">Chat AI</h1>
                    </a>
                    <textarea
                        required
                        className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a question related to law"
                    ></textarea>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={generatingAnswer}
                    >
                        Generate answer
                    </button>
                </form>
                <div className="w-full lg:w-3/3 xl:w-2/2  rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105 overflow-auto">
                    <ReactMarkdown className="p-6">{answer}</ReactMarkdown>
                </div>
            </div>
        </>
    );
};

export default LegalQuery;
