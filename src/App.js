import { useState, useEffect } from "react";

import "./App.css";

const InputField = ({ setText, text }) => {
  return (
    <div style={{ width: "70%" }}>
      <div
        style={{
          flexDirection: "column",
          flex: 1,
          border: "1px solid",
          borderRadius: "5px",
          margin: "0px",
        }}
      >
        <textarea
          value={text}
          maxLength={140}
          placeholder={"What's on your mind?"}
          style={{ flex: 1, border: "none", minHeight: "150px" }}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

const HorizontalLine = () => {
  return (
    <div
      id="borderBottom"
      style={{
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        height: 20,
        borderBottom: "1px solid #dedede",
      }}
    />
  );
};

const CurrentTweet = ({ tueet }) => {
  console.log("tueettt ", tueet);
  return (
    <>
      <div style={{ height: 200, width: "70%", backgroundColor: "#dedede" }}>
        {tueet?.text}
      </div>
      <div
        onClick={() => {
          console.log("TODO get new tueet");
        }}
        style={{
          height: 30,
          width: 100,
          backgroundColor: "#dedede",
          alignSelf: "end",
          marginTop: 15,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <span>REFRESH</span>
      </div>
    </>
  );
};

function App() {
  const [tueet, setTueet] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/get/tueets")
      .then((res) => res.json())
      .then((res) => {
        setTueet(res.data);
      });
  }, []);

  console.log(tueet);

  return (
    <div className="custom-field">
      <div style={{ flexGrow: 1 }}></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          padding: "20px",
        }}
      >
        <InputField text={text} setText={setText} />
        <HorizontalLine />
        <CurrentTweet tueet={tueet} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            margin: 5,
            backgroundColor: "red",
            height: 200,
            width: "70%",
          }}
        ></div>

        <div
          style={{
            margin: 5,
            backgroundColor: "red",
            height: 200,
            width: "70%",
          }}
        ></div>
        <div
          style={{
            margin: 5,
            backgroundColor: "red",
            height: 200,
            width: "70%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
