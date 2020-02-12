import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Client';
import { InputMask } from 'primereact/inputmask';

class Person extends Component {
    constructor() {
        super();
        this.state = {};
        this.onPersonSelect = this.onPersonSelect.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
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

    save() {
        if (this.state.person.firstName != "" && this.state.person.lastName != "" && this.state.person.email != "" && this.state.person.phone != "") {
            this.props.savePerson(this.state.person);
            this.growl.show({ severity: 'success', detail: this.newPerson ? "Data Saved Successfully" : "Data Updated Successfully" });
        }
    }

    delete() {
        this.props.deletePerson(this.state.person.personId);
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Lista de Pessoas</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Adicionar" icon="pi pi-plus" onClick={this.addNew} />
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
                                    <label htmlFor="firstName">Nome</label>
                                    <InputText id="firstName" onChange={(e) => { this.updateProperty('firstName', e.target.value) }} value={this.state.person.firstName} style={{ width: '100%' }} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName">Sobrenome</label>
                                    <InputText id="lastName" onChange={(e) => { this.updateProperty('lastName', e.target.value) }} value={this.state.person.lastName} style={{ width: '100%' }} required/>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-4">
                                    <label htmlFor="cpf">Cpf</label>
                                    <InputText id="cpf" onChange={(e) => { this.updateProperty('cpf', e.target.value) }} value={this.state.person.cpf} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email">E-mail</label>
                                    <InputText id="email" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.person.email} style={{ width: '100%' }} required/>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="phone">Celular</label>
                                    <InputMask id="phone" mask="(99)99999-9999" onChange={(e) => { this.updateProperty('phone', e.target.value) }} value={this.state.person.phone} style={{ width: '100%' }} required/>
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="form-group col-md-2">
                                    <Button label="Excluir" disabled={this.newPerson ? true : false} icon="pi pi-times" onClick={this.delete} />
                                </div>
                                <div className="form-group col-md-10">
                                    <Button label={this.newPerson ? "Próximo" : "Atualizar"} icon="pi pi-check" onClick={this.save} />
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
        people: state.people.people,
        loading: state.people.loading,
        errors: state.people.errors,
        forceReload: state.people.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Person);