import React from "react";
import "./AnswerList.scss"
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) => (
    <ul className='AnswerList'>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id]: null}
                />
            )
        })}
    </ul>
)

export default AnswerList