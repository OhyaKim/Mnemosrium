import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import cenkor from "cenkor";
import Pattern from '../components/pattern';
import '../styles/Input.css';
import { supabase } from "../utils/Database";

const viewports = [
  "case01", "case02", "case03", "case04", "case05"
];

function InputPage() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    const timer = setTimeout(() => {
      setFadeIn(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);



  const sendMemory = async (inputValue) => {
    const Style = Math.floor(Math.random() * viewports.length);

    let nonePass = cenkor(inputValue).filtered;
    console.log(nonePass);

    if (nonePass) {
      alert("비속어가 감지되었습니다.\n따뜻한 표현으로 다시 작성해주세요");
    } else if (!nonePass) {

      const { error } = await supabase
        .from("Mnemosrium:proto")
        .insert([{ style: viewports[Style], memory: inputValue }]);

      if (error) {
        console.error("메모리 저장 실패:", error.message);
      } else {
        console.log("메모리 저장 성공:", inputValue);


        setFadeOut(true);
        setTimeout(() => {
          navigate("/Sending");
          setFadeOut(false);
        }, 1000)


        setTimeout(() => {
          nonePass = false
        }, 1000);

      }

    }
  };

  return (
    <div className={`Inputpage ${fadeIn ? "fadeIn" : ""} ${fadeOut ? "fadeOut" : ""}`} >
      <div className="Input-bg">
        <div className="Input-gr01"></div>
        <div className="Input-gr02"></div>
        <div className="Input-gr03"></div>
      </div>

      <div className={`Input-con ${fadeIn ? "fadeIn" : ""}`}>
        <div className="Input-con-bg">
          <div className="Input-con-gr01"></div>
          <div className="Input-con-gr02"></div>
          <Pattern></Pattern>
        </div>

        <div className="Input-con-con">
          <div className="Input-con-logo"></div>
          <div className="Input-con-question">
            가장 기억에 남는 선택의 순간은 언제인가요?
          </div>
          <form
            className="Input-con-answer"
            onSubmit={(e) => {
              e.preventDefault();
              sendMemory(inputValue);
              //console.log("제출된 값:", inputValue);
            }}
          >
            <textarea
              className="Input-con-textInput"
              autoFocus
              placeholder="어떤 이야기든 소중히 전달할게요. 떠오르는 기억을 적어주세요."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 100);
              }}
            ></textarea>

            <button
              type="submit"
              className={`Input-con-btn ${inputValue.trim() ? "show" : "hide"}`}
            >
              기록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputPage;
