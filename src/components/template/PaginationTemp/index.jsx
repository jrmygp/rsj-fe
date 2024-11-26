import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export default function PaginationTemp({ page, handlePageChange, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => handlePageChange(page - 1)}
            variant={'outline'}
            disabled={page === 1}
            className={`min-w-[100px] px-3 py-1`}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{`${page} / ${totalPages}`}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() => handlePageChange(page + 1)}
            variant={'outline'}
            disabled={page === totalPages}
            className={`min-w-[100px] px-3 py-1`}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
