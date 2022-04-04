import React, {
  FC, memo, useMemo, useCallback, useState,
} from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';

interface IPaginationProps {
  totalData: number;
  limitView: number;
  getData: (start: number, limitView: number) => void;
}

const PaginationWrapper: FC<IPaginationProps> = (props) => {
  const {
    limitView,
    totalData,
    getData,
  } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(() => Math.ceil(totalData / limitView), [totalData, limitView]);

  const handlePageChange = useCallback((event: React.SyntheticEvent<HTMLElement>, data: PaginationProps) => {
    const start = (data.activePage as number - 1) * limitView;
    setCurrentPage(data.activePage as number);

    getData(start, limitView);
  }, [limitView]);

  if (totalPages > 1) {
    return (
      <Pagination
        boundaryRange={0}
        defaultActivePage={currentPage}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={totalPages}
        totalPages={totalPages}
        nextItem={null}
        prevItem={null}
        onPageChange={handlePageChange}
      />
    );
  }
  return null;
};

export default memo(PaginationWrapper);
