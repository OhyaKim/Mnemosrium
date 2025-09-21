import { useState } from 'react';
import '../styles/Input.css';
import { supabase } from "../utils/Database";

function InputPage() {
    const [inputValue, setInputValue] = useState("");

    const sendMemory = async (inputValue) => {
        const { data, error } = await supabase
            .from("Mnemosrium:proto")
            .insert([{ memory: inputValue }])

        if (error) {
            console.error("메모리 저장 실패:", error.message)
        } else {
            console.log("메모리 저장 성공:", inputValue)
        }
    }


    return (
        <div className="Inputpage">
            <div className="Input-bg">
                <div className="Input-gr01"></div>
                <div className="Input-gr02"></div>
                <div className="Input-gr03"></div>
            </div>

            <div className="Input-con">
                <div className="Input-con-bg">
                    <div className="Input-con-gr01"></div>
                    <div className="Input-con-gr02"></div>
                    <div className="Input-con-ptns">
                        <div className="Input-con-ptn"></div>
                        <div className="Input-con-ptn"></div>
                    </div>
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

                            console.log("제출된 값:", inputValue);
                        }}
                    >
                        <textarea
                            className="Input-con-textInput"
                            autoFocus
                            placeholder="어떤 이야기든 소중히 전달할게요. 떠오르는 기억을 적어주세요."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
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
