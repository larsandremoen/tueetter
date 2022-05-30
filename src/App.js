import { useState, useEffect } from "react";

import "./App.css";

const SimilarTueet = ({ tueet }) => {
  console.log("hee ", tueet);
  return (
    <>
      <div
        style={{
          margin: 5,
          backgroundColor: "#dedede",
          borderRadius: 5,
          height: 200,
          width: "70%",
        }}
      >
        {tueet?.text}
      </div>
    </>
  );
};

const InputField = ({ setText, text }) => {
  return (
    <>
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
      <div
        onClick={() => {
          setText("");
          postTueets(text);
        }}
        style={{
          height: 30,
          width: 100,
          backgroundColor: "#dedede",
          marginTop: 15,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          POST
        </div>
      </div>
    </>
  );
};

const postTueets = (text) => {
  fetch("http://localhost:8000/post/tueet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
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

const CurrentTweet = ({ tueet, refresh }) => {
  console.log("tueettt ", tueet);
  return (
    <>
      <div
        style={{
          marginTop: 30,
          borderRadius: 5,
          padding: 20,
          height: 200,
          width: "70%",
          backgroundColor: "#dedede",
        }}
      >
        {tueet?.text}
      </div>
      <div
        onClick={refresh}
        style={{
          height: 30,
          width: 100,
          backgroundColor: "#dedede",
          marginTop: 15,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          REFRESH
        </div>
      </div>
    </>
  );
};

function App() {
  const [tueet, setTueet] = useState("");
  const [tueetSimilar, setTueetSimilar] = useState([]);
  const [text, setText] = useState("");

  const fetchTueet = () => {
    return fetch("http://localhost:8000/get/tueets")
      .then((res) => res.json())
      .then((res) => {
        setTueet(res?.random);
        setTueetSimilar(res?.similar);
      });
  };

  useEffect(() => {
    fetchTueet();
  }, []);

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
        <CurrentTweet tueet={tueet} refresh={fetchTueet} />
      </div>
      <div style={{ flex: 1 }}>
        {tueetSimilar.map((t, idx) => {
          return <SimilarTueet tueet={t} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default App;
