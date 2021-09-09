import React from "react";
import "./ActiveQuiz.scss"
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => (
    <div className='ActiveQuiz'>
        <p className='ActiveQuiz__Question'>
            <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                {props.question}
            </span>
            <small> {props.answerNumber} from {props.quizLength}</small>
        </p>

        <AnswerList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz