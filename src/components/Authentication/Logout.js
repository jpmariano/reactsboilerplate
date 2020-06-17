import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {

    const history = useHistory();

    useEffect(() => {
        const logout = () => {
            console.log(1);
            sessionStorage.clear();
            history.push("/");
        }

        logout();
    });

    return null;
}

export default Logout;
