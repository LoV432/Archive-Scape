import { MessagesPagination } from '@/components/Pagination';
import MessagesSection from './MessagesSection';
import { Message } from '@/lib/all-messages';
import SearchBar from './SearchBar.client';

export default function SearchPage({
	data,
	searchQuery,
	page,
	preSelectedDateStart,
	preSelectedDateEnd
}: {
	data: { messages: Message[]; totalPages: number };
	page: number;
	searchQuery: string;
	preSelectedDateStart: Date | undefined;
	preSelectedDateEnd: Date | undefined;
}) {
	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				preSelectedDateStart={preSelectedDateStart}
				preSelectedDateEnd={preSelectedDateEnd}
			/>
			{data.messages.length === 0 && (
				<div className="flex flex-col place-items-center gap-4">
					{searchQuery !== '' && (
						<>
							<p className="text-xl font-semibold">No results :(</p>
							<img
								src="/scribble.gif"
								alt="no search results"
								width={200}
								height={200}
							/>
						</>
					)}
					{searchQuery === '' && (
						<img
							src="/cat.gif"
							alt="cat waiting patiently"
							width={400}
							height={400}
						/>
					)}
				</div>
			)}
			{data.messages.length > 0 && (
				<>
					{data.totalPages > 1 && (
						<MessagesPagination
							order="desc"
							page={page}
							totalPages={data.totalPages}
						/>
					)}
					<MessagesSection messages={data.messages} />
					{data.totalPages > 1 && (
						<MessagesPagination
							order="desc"
							page={page}
							totalPages={data.totalPages}
						/>
					)}
				</>
			)}
		</>
	);
}
