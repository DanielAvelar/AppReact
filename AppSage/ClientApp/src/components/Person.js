import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Client';

class Person extends Component {
    constructor() {
        super();
        this.state = {};
        this.onPersonSelect = this.onPersonSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
    }

    componentDidUpdate() {
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestPeople();
    }

    updateProperty(property, value) {
        let person = this.state.person;
        person[property] = value;
        this.setState({ person: person });
    }

    onPersonSelect(e) {
        this.newPerson = false;
        this.setState({
            person: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newPerson = true;
        this.setState({
            person: { cpf: '', firstName: '', lastName: '', email: '', phone: '' }
        });
    }

    nextPage() {
        this.props.nextPage();
    }

    save() {
        if (this.state.person.firstName != "" && this.state.person.lastName != "" && this.state.person.email != "" && this.state.person.phone != "") {
            this.props.savePerson(this.state.person);
            this.growl.show({ severity: 'success', detail: this.newPerson ? "Data Saved Successfully" : "Data Updated Successfully" });
            this.props.nextPage();
        }
    }

    delete() {
        this.props.deletePerson(this.state.person.personId);
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Lista de Pessoas</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button variant="contained" color="default" style={{ float: 'left' }} onClick={this.addNew}>Adicionar</Button>
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.people} selectionMode="single" header={header} footer={footer} selection={this.state.selectedPerson} onSelectionChange={e => this.setState({ selectedPerson: e.value })} onRowSelect={this.onPersonSelect} style={{ marginTop: 10 }} scrollable={true} scrollHeight="200px">
                    <Column field="personId" header="ID" />
                    <Column field="cpf" header="Cpf" />
                    <Column field="firstName" header="Nome" />
                    <Column field="lastName" header="Sobrenome" />
                    <Column field="email" header="E-mail" />
                    <Column field="phone" header="Celular" />
                </DataTable>
                <div>
                    {
                        this.state.person &&
                        <form>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-6">
                                    <TextField maxLength="50" label="Nome" variant="outlined" id="firstName" onChange={(e) => { this.updateProperty('firstName', e.target.value) }} value={this.state.person.firstName} style={{ width: '100%' }} required/>
                                </div>
                                <div className="col-md-6">
                                    <TextField maxLength="50" label="Sobrenome" variant="outlined" id="lastName" onChange={(e) => { this.updateProperty('lastName', e.target.value) }} value={this.state.person.lastName} style={{ width: '100%' }} required/>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-4">
                                    <TextField id="cpf" label="Cpf" variant="outlined" onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 15)
                                    }} onChange={(e) => { this.updateProperty('cpf', e.target.value) }} value={this.state.person.cpf} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-6">
                                    <TextField id="email" label="E-mail" variant="outlined" maxLength="50" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.person.email} style={{ width: '100%' }} required/>
                                </div>
                                <div className="col-md-2">
                                    <TextField id="phone" label="Celular" variant="outlined" maxLength="14" onChange={(e) => { this.updateProperty('phone', e.target.value) }} value={this.state.person.phone} style={{ width: '100%' }} required/>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="form-group col-md-2">
                                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} disabled={this.newPerson ? true : false} onClick={this.delete}>Excluir</Button>
                                </div>
                                <div className="form-group col-md-10">
                                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={this.save}> {this.newPerson ? "Salvar e cadastrar endereço" : "Atualizar"} </Button>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        people: state.client.people,
        loading: state.client.loading,
        personId: state.client.personId,
        responseStatus: state.client.responseStatus,
        errors: state.client.errors,
        forceReload: state.client.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Person);