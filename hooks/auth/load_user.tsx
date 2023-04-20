import { useEffect, useState } from "react";
import { loggedOutState } from "../../context/auth_context/types";
import { IAuthState } from "../../context/auth_context/types";
import { secureRead } from "../../utils/secure_storage";

export default function loadUser(){
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [userData, setUserData] = useState<IAuthState>(loggedOutState);

    useEffect(() => {
        secureRead("authState")
            .then((data: IAuthState) => {
                setIsLoading(false);
                if(data){
                    setUserData(data);
                }
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            })
    }, [])

    return {isLoading, isError, userData}
}