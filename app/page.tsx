'use client';
import { useQuery } from '@tanstack/react-query';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const query = useQuery({
		queryKey: ['top-users'],
		queryFn: async () => {
			const res = await fetch('/api/top-users');
			if (!res.ok) {
				throw new Error('Error');
			}
			return (await res.json()) as { userId: string; messageCount: number }[];
		}
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{query.isLoading && <p>Loading...</p>}
			{query.isError && <p>Error</p>}
			{query.isSuccess && (
				<Table className="cursor-default">
					<TableCaption>Top Users</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">User</TableHead>
							<TableHead className="text-right">Message Count</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{query.data.map((user, index) => (
							<TableRow
								onClick={() =>
									router.push(`/user/messages?userId=${user.userId}`)
								}
								key={user.userId}
							>
								<TableCell
									className={`font-medium ${colorGradientByIndex(index)}`}
								>
									{user.userId}
								</TableCell>
								<TableCell className="text-right">
									{user.messageCount}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</main>
	);
}

function colorGradientByIndex(index: number) {
	const colors = [
		'text-red-500',
		'text-orange-500',
		'text-amber-500',
		'text-lime-500',
		'text-green-500',
		'text-emerald-500',
		'text-teal-500',
		'text-cyan-500',
		'text-sky-500',
		'text-blue-500'
	];
	return colors[index];
}
