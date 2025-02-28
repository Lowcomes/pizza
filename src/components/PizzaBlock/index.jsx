import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

function PizzaBlock({ item }) {
  const [activeType, setActiveType] = React.useState(item.types[0]);
  const [activeSize, setActiveSize] = React.useState(item.sizes[0]);
  const typesName = ['тонкое', 'традиционное'];
  const dispatch = useDispatch();
  const activeCount = useSelector((state) =>
    state.cartSlice.item.find((obj) => obj.id === item.id),
  );
  const addCart = (obj) => {
    const itemCart = {
      id: obj.id,
      title: obj.title,
      price: obj.price,
      imageUrl: obj.imageUrl,
      type: typesName[activeType],
      size: activeSize,
    };
    dispatch(addItem(itemCart));
  };
  const addedCount = activeCount ? activeCount.count : 0;
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{item.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {item.types.map((obj) => (
            <li
              key={obj}
              onClick={() => setActiveType(obj)}
              className={activeType === +obj ? 'active' : ''}>
              {typesName[obj]}
            </li>
          ))}
        </ul>
        <ul>
          {item.sizes.map((obj, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(obj)}
              className={activeSize === +obj ? 'active' : ''}>
              {obj} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {item.price} ₽</div>
        <div className="button button--outline button--add" onClick={() => addCart(item)}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
