import React, {Component} from "react";
import "./Drawer.scss"
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from 'react-router-dom'



const links = [
    {
        to: '/',
        label: 'List',
        exact: true
    },
    {
        to: '/auth',
        label: 'Auth',
        exact: false
    },
    {
        to: '/quiz-creator',
        label: 'Create Test',
        exact: false
    },
]


export default class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName='Drawer__active'
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }




    render() {


        const cls = [
            'Drawer'
        ]
        if (!this.props.isOpen) {
            cls.push('Drawer__close')

        }


        return(
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>

        )
    }
}