import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { IMentor, IMessage } from "../shared/interfaces";
import { MENTORS } from "../shared/utils";
import { Configuration, OpenAIApi } from "openai";
import { MUMS_THE_WORD } from "../shared/utils";
import Navbar from "../components/Navbar";

function Chat() {
  const [prompt, setPrompt] = useState<string>('');
  const [mentor, setMentor] = useState<IMentor>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const promptInputRef = useRef<null | HTMLInputElement>(null);
  const { mentorName } = useParams();

  const configuration = new Configuration({
    apiKey: MUMS_THE_WORD,
  });
  const openAIApi = new OpenAIApi(configuration);

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
      try {
        const response = await openAIApi.createChatCompletion({ model: 'gpt-3.5-turbo', messages: newMessages });
        setFetching(false);
        const responseMessage: IMessage = response.data.choices[0].message as IMessage;
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
        <div key={message.content.substring(0, 20)} className="w-full flex flex-row justify-start items-start p-3">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg bg-slate-200" src="/src/assets/user.png" alt="user" />
          <div className="pl-3 whitespace-pre-wrap">{message.content}</div>
        </div>
      );
    } else if (message.role === 'assistant') {
      return (
        <div key={message.content.substring(0, 20)} className="w-full flex flex-row justify-start items-start bg-slate-100 p-3">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg" src={`/src/assets/${mentor?.imageUrl}`} alt={mentor?.name} />
          <div className="pl-3 whitespace-pre-wrap">{message.content}</div>
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
    <div className='md:w-5/6 max-w-2xl m-auto flex flex-col justify-start items-center h-screen'>
      <Navbar showHomeLink={true} />
      <div className="w-full overflow-y-auto pb-16 md:pb-24">
        <div className="w-full flex flex-row justify-start items-start bg-slate-100 p-3">
          <img className="w-auto h-10 shrink-0 rounded-full shadow-lg" src={`/src/assets/${mentor?.imageUrl}`} alt={mentor?.name} />
          <div className="pl-3">How can I help you, my friend?</div>
        </div>
        {messageComponents}
        {fetching &&
          <div className="animate-pulse flex p-3">
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
      <div className="w-full flex flex-row justify-center items-center absolute inset-x-0 bottom-0 py-3 md:py-6 bg-white">
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
    </div>
  );
}

export default Chat;
