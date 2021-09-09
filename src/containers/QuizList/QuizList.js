import React, {Component} from 'react';
import "./QuizList.scss"
import {NavLink} from "react-router-dom";

class QuizList extends Component {

    renderQuizes() {
        return [1,2,3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Test -- {quiz}
                    </NavLink>
                </li>
            )
        })
    }


    render() {
        return (
            <div className='QuizList'>
              <div>
                  <h1>Tests list</h1>

                  <ul>
                      {this.renderQuizes()}
                  </ul>
              </div>
            </div>
        );
    }
}

export default QuizList;