import axios from 'axios';
import qs from 'qs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import SkeletoPizza from '../components/PizzaBlock/SkeletoPizza';
import Sort, { sortName } from '../components/Sort';
import { setCategoryIndex, setFilters } from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzasSlice';
function Home() {
  const categoryIndex = useSelector((state) => state.filterSlice.categoryIndex);
  const activeSort = useSelector((state) => state.filterSlice.sort);
  const activeSortSize = useSelector((state) => state.filterSlice.activeSortSize);
  const numberPage = useSelector((state) => state.filterSlice.numberPage);
  const itemPizza = useSelector((state) => state.pizzaSlice.itemPizza);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id));
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryIndex,
        activeSort: activeSort.sortProperty,
        activeSortSize,
        numberPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryIndex, activeSort.sortProperty, activeSortSize, numberPage, searchValue]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в REDUX
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortName.find((obj) => obj.sortProperty === params.activeSort);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true);
      const firstLoading = async () => {
        try {
          dispatch(fetchPizza({ numberPage, categoryIndex, activeSort, activeSortSize }));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      firstLoading();
      window.scroll(0, 0);
    }
    isSearch.current = false;
  }, [categoryIndex, activeSort, activeSortSize, numberPage, searchValue]);

  const pizzas = itemPizza
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock item={item} key={item.id} />);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryIndex} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...Array(10)].map((_, index) => <SkeletoPizza key={index} />) : pizzas}
      </div>
      <Pagination />
    </>
  );
}

export default Home;
