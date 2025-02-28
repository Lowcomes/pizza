import React from 'react';
import styles from './Search.module.scss';
import SearchSvg from '../img/search.svg';
import CloseSvg from '../img/close_icon.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();
  const OnClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((string) => {
      setSearchValue(string);
    }, 500),
    [],
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.search}>
      <img src={SearchSvg} alt="Search" className={styles.logoSvg} />
      <input
        ref={inputRef}
        className={styles.root}
        placeholder={` Поиск пиццы...`}
        onChange={(event) => onChangeInput(event)}
        value={value}
      />
      {value && <img src={CloseSvg} alt="Close" onClick={OnClickClear} className={styles.close} />}
    </div>
  );
};

export default Search;
