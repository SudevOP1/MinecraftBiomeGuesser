import { useState } from "react";
import OuterDiv from "../components/OuterDiv";
import TestComponent from "../components/TestComponent";
import Loader from "../components/Loader";

const Quiz = () => {
  let apiUrl = "http://127.0.0.1:8000/";

  let [username, setUsername] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [test, setTest] = useState(null);
  let [loading, setLoading] = useState(false);

  let handleUsernameSubmit = async (e) => {
    e.preventDefault();
    let usernameInputValue = inputValue.trim();
    if (usernameInputValue) {
      setLoading(true);
      try {
        let response = await fetch(apiUrl + "base/create_username/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameInputValue,
          }),
        });
        let data = await response.json();
        if (data.success || data.error == "username already exists") {
          setUsername(usernameInputValue);
          fetchTest();
        } else {
          alert(data.error);
        }
      } catch (e) {
        alert(`couldnt create username: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  let fetchTest = async () => {
    setLoading(true);
    try {
      let response = await fetch(apiUrl + "base/get_test/");
      let data = await response.json();
      if (data.success) {
        setTest(data.test);
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert(`couldnt fetch test: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* loader */}
      {loading && <Loader />}

      {/* username input */}
      {!loading && username.length === 0 && (
        <OuterDiv
          maxWidth="max-w-3xl"
          classname="flex items-center justify-center"
        >
          <div className="w-full max-w-sm">
            <h1 className="text-2xl text-white mb-6 text-center">
              Enter username
            </h1>
            <form
              onSubmit={handleUsernameSubmit}
              className="flex flex-col gap-4 items-center justify-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-4 pt-3 pb-2 rounded-xl text-white placeholder:text-indigo-300
                  outline-none border-2 border-indigo-600 text-center w-full"
                placeholder="Username"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-black rounded-full cursor-pointer flex items-center
                  justify-center transition duration-100 border-4 border-[#020617]
                  shadow-[0px_9px_0px_0px_#020617] active:shadow-none active:translate-y-3 text-lg
                  w-full pt-3 pb-2"
              >
                Enter
              </button>
            </form>
          </div>
        </OuterDiv>
      )}

      {/* test */}
      {!loading && test && <TestComponent test={test} username={username} />}
    </>
  );
};

export default Quiz;
