import styles from './ingredient-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { deleteIngredient } from '../../services/burger-constructor/actions';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

function IngredientConstructor(props) {

    const {
        ingredient,
        index,
        moveCard,
        uniqKey
    } = props;

    const dispatch = useDispatch();

    function deleteConstructorIngredient(uniqKey) {
        dispatch(deleteIngredient(uniqKey));
    }

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'sort',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { uniqKey, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <li ref={ref} key={ingredient.uniqKey} className={styles[`${isDragging ? 'topping-container-hide' : 'topping-container'}`]} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <div className={styles['item-container']}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => deleteConstructorIngredient(ingredient.uniqKey)}
                />
            </div>
        </li>
    );
}

export default IngredientConstructor;
