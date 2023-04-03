import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { IMentor, IMessage } from "../shared/interfaces";
import { MENTORS } from "../shared/utils";
import { MENTOR_CHAT_API_URL } from "../shared/utils";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Chat() {
  const [prompt, setPrompt] = useState<string>('');
  const [mentor, setMentor] = useState<IMentor>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const promptInputRef = useRef<null | HTMLInputElement>(null);
  const { mentorName } = useParams();

  useEffect(() => {
    const mentor = MENTORS.find(iter => iter.name === mentorName);
    setMentor(mentor);
    const systemMessage = `You are a helpful assistant in the voice of ${mentorName}`;
    setMessages([{ role: 'system', content: systemMessage }]);
  }, [mentorName]);

  useEffect(() => {
    promptInputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [fetching, messages]);

  function handlePromptKeyDown(key: string) {
    if (key === 'Enter') {
      submitPrompt();
    }
  }

  async function submitPrompt() {
    if (prompt) {
      setFetching(true);
      setPrompt('');
      const newMessages: IMessage[] = [...messages, { role: 'user', content: prompt }];
      setMessages(newMessages);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages })
        };
        const response = await fetch(`${MENTOR_CHAT_API_URL}/createChatCompletion`, requestOptions);
        const responseMessage: IMessage = await response.json();
        setFetching(false);
        if (!responseMessage) {
          throw 'No message returned';
        }
        setMessages([...newMessages, responseMessage]);
      } catch (error: any) {
        setFetching(false);
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          console.error(error);
        }
      }
    }
  }

  const messageComponents = messages.slice(1).map(message => {
    if (message.role === 'user') {
      return (
        <div key={message.content.substring(0, 20)} className="w-full flex flex-row justify-start items-start p-3 z-0">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg bg-slate-200" src="/images/user.png" alt="user" />
          <div className="pl-3 whitespace-pre-wrap">{message.content}</div>
        </div>
      );
    } else if (message.role === 'assistant') {
      return (
        <div key={message.content.substring(0, 50)} className="w-full flex flex-row justify-start items-start bg-slate-100 p-3 z-0">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg" src={`/images/${mentor?.imageUrl}`} alt={mentor?.name} />
          <div className="pl-3 prose max-w-none overflow-x-auto">
            <ReactMarkdown
              children={message.content}
              components={{
                code({ node, inline, className, children, style, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={a11yDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div>
        </div>
      );
    } else {
      // Should never happen
      console.error('Unexpected value in messages...');
      console.error(message);
      return null;
    }
  });

  return (
    <div className='md:w-5/6 max-w-5xl m-auto flex flex-col justify-start items-center h-screen'>
      <div className="w-full flex flex-row justify-center items-center sticky top-0 py-3 md:py-4 bg-white border-b-2 border-gray-700 z-50">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => handlePromptKeyDown(e.key)}
          ref={promptInputRef}
          className='placeholder:italic placeholder:text-slate-400 block bg-white w-2/3 md:w-5/6 max-w-xl border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
          type='text'
          placeholder='Enter prompt...'
          disabled={fetching}
        />
        <button onClick={() => submitPrompt()} disabled={fetching} className="bg-sky-500 hover:bg-sky-700 text-white rounded-2xl w-16 h-8 ml-3">Send</button>
      </div>
      <div className="w-full overflow-y-auto">
        <div className="w-full flex flex-row justify-start items-start bg-slate-100 p-3 z-0">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg" src={`/images/${mentor?.imageUrl}`} alt={mentor?.name} />
          <div className="pl-3">How can I help you, my friend?</div>
        </div>
        {messageComponents}
        {fetching &&
          <div className="animate-pulse flex p-3 z-0">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1 pl-3">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        }
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}

export default Chat;
