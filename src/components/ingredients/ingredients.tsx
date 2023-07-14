import { forwardRef } from 'react';
import styles from './ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { IIngredient } from '../../utils/types';

interface IIngredientsProps {
    heading: string;
    data: IIngredient[];
}

const Ingredients = forwardRef<HTMLDivElement, IIngredientsProps>((props, ref): JSX.Element => {

    const {
        heading,
        data
    } = props;

    return (
        <section className={styles.ingredients}>
            <h1 ref={ref} className={styles.heading}>{heading}</h1>
            <div className={styles['grid-container']}>
                {data.length !== 0 && (
                    <>
                        {data.map((ingredient) => (
                            <Ingredient
                                key={ingredient._id}
                                ingredient={ingredient}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
})

export default Ingredients;
