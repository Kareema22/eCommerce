import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export function UserContextProvider(props) {

    useEffect(() => {
        if (localStorage.getItem("userToken"))
            setUserToken(localStorage.getItem("userToken"))
    }, [])

    const [userToken, setUserToken] = useState(null);
    return <>
        <UserContext.Provider value={{ userToken, setUserToken }}>
            {props.children}
        </UserContext.Provider >
    </>

}

