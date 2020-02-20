import React, { Component, PropTypes } from 'react'
import Person from './Person'
import Address from './Address'

class Navigator extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1
        }
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
            {page === 1 && <Person nextPage={this.nextPage} />}
            {page === 2 && <Address previousPage={this.previousPage} />}
        </div>
        )
    }
}

export default Navigator;