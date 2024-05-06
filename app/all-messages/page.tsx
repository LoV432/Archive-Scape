import { Metadata } from 'next/types';
import AllMessagesPage from './page.client';

export const metadata: Metadata = {
	title: 'All Messages | ArchiveScape',
	description: 'An archive of all messages sent on https://www.ventscape.life/'
};

export default function Page() {
	return <AllMessagesPage />;
}
