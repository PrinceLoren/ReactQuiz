import React, {Component} from 'react';
import Button from "../../components/UI/Button/Button";

import { createControl } from "../../form/formFramework"
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

import "./QuizCreator.scss"


function createOptionControl(number) {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'Variant cannot be empty',
        id: number
    }, {required: true})
}


function createFormControls() {
    return {
        question: createControl({
            label: 'Enter Question',
            errorMessage: 'Question cannot be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4 : createOptionControl(4),
    }
}
class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onQuestionHandler = () => {

    }

    createQuizHandler = () => {


    }

    changeHandler = (value, controlName) => {

    }


    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary  key={controlName + index}>
                    <Input
                        label={control.label}
                        valid={control.valid}
                        value={control.value}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })

    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }


    render() {

        const select = <Select
            label='Choose right answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />


        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Test Creator</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        {select}
                        <Button
                            type='Button__primary'
                            onClick={this.onQuestionHandler}
                        >
                            Add Question
                        </Button>

                        <Button
                            type='Button__success'
                            onClick={this.createQuizHandler}
                        >
                            Create Test
                        </Button>



                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;