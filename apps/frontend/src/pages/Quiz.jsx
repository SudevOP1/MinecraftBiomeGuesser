import React, { useState } from "react";

const Quiz = () => {
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

export default Quiz;
