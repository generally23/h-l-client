import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Paginate({ pages, onPageChange, page }) {
  return (
    <div className='pagination'>
      <Pagination
        count={pages}
        onChange={onPageChange}
        page={page}
        color='secondary'
        classes={{ ul: 'justify-center' }}
        renderItem={item => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </div>
  );
}

export default Paginate;
