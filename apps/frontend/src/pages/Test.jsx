import React, { useState } from "react";

const Test = () => {
  let [username, setUsername] = useState("");

  return (
    <>
      {username.length === 0
      ? (
        <h1>yo</h1>
      ) : (
        <h1>hello</h1>
      )
    }

    </>
  );
};

export default Test;
