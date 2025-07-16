import { TwoPaneLayout } from '../../components/TwoPaneLayout';
import { ChatWindow } from '../../components/ChatWindow';
import { StudyDashboard } from '../../components/StudyDashboard';

export default function ChatPage() {
    return (
        <TwoPaneLayout
            left={<StudyDashboard />}
            right={<ChatWindow />}
        />
    );
}