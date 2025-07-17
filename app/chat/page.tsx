import { ChatWindow } from '../../components/ChatWindow';

export default function ChatPage() {
    return (
        <div className="flex-1 ">
            {/* Chat Window - Main focus */}
            <div className="h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white rounded-2xl ">
                <ChatWindow />
            </div>
        </div>
    );
}