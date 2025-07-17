import { ChatWindow } from '../../components/ChatWindow';

export default function ChatPage() {
    return (
        <div className="flex-1">
            {/* Chat Window - Main focus */}
            <div className="h-screen max-w-4xl mx-auto bg-white rounded-2xl ">
                <ChatWindow />
            </div>
        </div>
    );
}