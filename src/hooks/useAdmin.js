import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    useEffect( () =>{
        const email = user?.email;
        if(email){
            fetch(`https://manufacturer-site.herokuapp.com/admin/${email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessKey')}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                setAdmin(data.admin);
            })
        }
    }, [user])

    return [admin]
}

export default useAdmin;