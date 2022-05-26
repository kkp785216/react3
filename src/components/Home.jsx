import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes"

function Home(props) {
    let navigator = useNavigate();
    useEffect(() => {
        props.changeTitle(props.title);
        // eslint-disable-next-line
        if(!localStorage.getItem("token")){
            navigator('/login');
        }
    }, []);
    return (
        <Notes showAlert={props.showAlert}/>
    )
}

export default Home