import styles from './profile.module.css';
import { logout } from '../../services/user/actions'
import { useDispatch } from 'react-redux';

function Profile() {

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <div className={styles.profile}>
            <h1 onClick={handleLogout}>Profile</h1>
        </div>
    )
}

export default Profile;
