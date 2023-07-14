import styles from './ingredient-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { deleteIngredient } from '../../services/burger-constructor/actions';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';

interface IIngredientConstructorProps {
    ingredient: IIngredient & { uniqKey: string };
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
    uniqKey: string;
}

type TDragObject = {
    uniqKey: string;
    index: number;
}

type TDragCollectedProps = {
    isDragging: boolean
}

type TDropCollectedProps = {
    handlerId: Identifier | null
}

function IngredientConstructor(props: IIngredientConstructorProps): JSX.Element {

    const {
        ingredient,
        index,
        moveCard,
        uniqKey
    } = props;

    const dispatch = useDispatch();

    function deleteConstructorIngredient(uniqKey: string) {
        dispatch(deleteIngredient(uniqKey));
    }

    const ref = useRef<HTMLDivElement | null>(null);

    const [{ handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
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
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

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

    const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
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
        <div ref={ref} key={ingredient.uniqKey} className={styles[`${isDragging ? 'topping-container-hide' : 'topping-container'}`]} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <div className={styles['item-container']}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => deleteConstructorIngredient(ingredient.uniqKey)}
                />
            </div>
        </div>
    );
}

export default IngredientConstructor;
