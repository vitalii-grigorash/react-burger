import styles from './ingredients.module.css';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import { ingredientsPropTypes } from '../../utils/types';

function Ingredients(props) {

    const {
        heading,
        data,
        openModal
    } = props;

    return (
        <section className={styles.ingredients}>
            <h1 className={styles.heading}>{heading}</h1>
            <div className={styles['grid-container']}>
                {data.length !== 0 && (
                    <>
                        {data.map((item) => (
                            <Ingredient
                                key={item._id}
                                item={item}
                                openModal={openModal}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}

export default Ingredients;

Ingredients.propTypes = {
    heading: PropTypes.string,
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    openModal: PropTypes.func
};
