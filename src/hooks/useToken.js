import React, { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    const url = `https://manufacturer-site.herokuapp.com/users/${email}`;

    if (email) {
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ currentUser }),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessKey = data.key;
          localStorage.setItem("accessKey", accessKey);
          setToken(accessKey);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
