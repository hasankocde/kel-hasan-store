import React from 'react'
import Conversation from './Conversation';
import Messages from './Messages';

const Chat = ({ conversations = [] }) => {
    return (
        <div className="">
            <div className="flex bg-white dark:bg-gray-900">
                <div className="w-20  text-gray-500 h-screen flex flex-col items-center justify-between py-5">
                    {/* Sidebar icons */}
                </div>
                <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
                    <div className="h-full overflow-y-auto">
                        <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">Chikaa</div>
                        <div className="search-chat flex p-3">
                            <input className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md" type="text" placeholder="Search Messages"/>
                            <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                                {/* Search Icon */}
                            </div>
                        </div>
                        <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">Recent</div>
                        <Conversation conversations={conversations} />
                    </div>
                </div>
                <div className="flex-grow  h-screen p-2 rounded-md">
                    <Messages conversations={conversations} />
                </div>
            </div>
        </div>
    )
}

export default Chat
