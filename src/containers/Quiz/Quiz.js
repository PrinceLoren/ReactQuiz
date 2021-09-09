import React, {Component}  from "react";
import "./Quiz.scss"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        results: {

        },
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }


    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[key] === 'AnswerItem__success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
            results[question.id] = 'FinishedQuiz__success'
        }
            this.setState({
                answerState: {
                    [answerId]: 'AnswerItem__success',
                    results
                }
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null

                    })
                }

                window.clearTimeout(timeout)
            }, 1000)



        } else {
            results[question.id] = 'FinishedQuiz__error'
            this.setState({
                answerState: {
                    [answerId]: 'AnswerItem__error',
                    results
                }
            })
        }


    }


    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}

        })
    }


    render() {
        return (
            <div className='Quiz'>


                <div className='Quiz__Wrapper'>
                    <h1>Answer on Questions</h1>
                    {
                        this.state.loading
                        ? <Loader />
                            :
                                this.state.isFinished
                                    ? <FinishedQuiz
                                        results={this.state.results}
                                        quiz={this.state.quiz}
                                        onRetry={this.retryHandler}
                                    />
                                    : <ActiveQuiz
                                        answers={this.state.quiz[this.state.activeQuestion].answers}
                                        question={this.state.quiz[this.state.activeQuestion].question}
                                        onAnswerClick={this.onAnswerClickHandler}
                                        quizLength={this.state.quiz.length}
                                        answerNumber={this.state.activeQuestion + 1}
                                        state={this.state.answerState}
                                    />



                    }

                </div>
            </div>
        )
    }
}

export default Quiz