import { useHistory } from "react-router-dom";

const CheckLogin = (props) => {
    let history = useHistory();
    const auth = props.children;

    if (auth == null || auth.auth !== true) {
        history.push("/");
    }
}

export default CheckLogin;