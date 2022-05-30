import { useState } from "react";

import "./App.css";

const InputField = ({ setText, text }) => {
  return (
    <div>
      <div
        style={{
          width: "70%",
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

const postTueets = (text) => {
  fetch("http://localhost:8000/post/tueet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
};

function App() {
  const [tueet, setTueet] = useState("");
  const [text, setText] = useState("");

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

        <div
          id="borderBottom"
          style={{
            marginTop: 10,
            width: "100%",
            height: 20,
            borderBottom: "1px solid #dedede",
          }}
        />
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
