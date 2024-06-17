'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationButton
} from '@/components/ui/pagination';
import GoToPageEllipsis from '@/components/GoToPageEllipsis';

export function MessagesPagination({
	totalPages,
	page,
	order
}: {
	totalPages: number | 'infinite';
	page: number;
	order: 'asc' | 'desc';
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	let params: string = '';
	searchParams.forEach((value, key) => {
		if (key !== 'page') {
			params += `&${key}=${value}`;
		}
	});

	const isInfinite = totalPages === 'infinite';
	const isLastPage = isInfinite ? false : page === totalPages;
	const isFirstPage = isInfinite ? false : page === 1;

	let previousPage, nextPage;
	if (isInfinite) {
		previousPage = page - 1;
		nextPage = page + 1;
	} else {
		// Techically, we don't need to check for overflow here because we hide the
		// pagination item if its going to overflow but eh, whatever
		previousPage = page - 1 >= 1 ? page - 1 : page;
		nextPage = page + 1 > totalPages ? page : page + 1;
	}

	return (
		<Pagination className="place-self-end pb-7">
			<PaginationContent>
				<PaginationItem>
					<PaginationButton
						isActive={!isFirstPage}
						href={`${pathname}?page=${previousPage}${params}`}
						className={`${isFirstPage ? 'hidden' : ''} select-none`}
						direction={order === 'asc' ? 'older' : 'newer'}
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink className="cursor-pointer">{page}</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<GoToPageEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationButton
						isActive={!isLastPage}
						href={`${pathname}?page=${nextPage}${params}`}
						className={`${isLastPage ? 'hidden' : ''} select-none`}
						direction={order === 'asc' ? 'newer' : 'older'}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}