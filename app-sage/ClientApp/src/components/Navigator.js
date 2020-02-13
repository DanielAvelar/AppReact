import React, { Component, PropTypes } from 'react'
import Person from './Person'
import Address from './Address'

class Navigator extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1,
            personId: ''
        }
    }

    setPersonId(id) {
        this.setState({ personId : id });
    }

    nextPage() {
        this.setState({ page: 2 })
    }

    previousPage() {
        this.setState({ page: 1 })
    }

    render() {
        const { page } = this.state
        return (<div>
            {page === 1 && <Person nextPage={this.nextPage} setPersonId={this.setPersonId}/>}
            {page === 2 && <Address previousPage={this.previousPage} idPerson={this.props.personId}/>}
        </div>
        )
    }
}

export default Navigator;