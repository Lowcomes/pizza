import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setNumberPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';
const Pagination = () => {
  const numberPage = useSelector((state) => state.filterSlice.numberPage);
  const dispatch = useDispatch();
  const onChageSetNumberPage = (event) => {
    dispatch(setNumberPage(event.selected + 1));
  };

  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={onChageSetNumberPage}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={numberPage - 1}
      />
    </div>
  );
};
export default Pagination;
