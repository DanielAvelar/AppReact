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

class Address extends Component {
    constructor() {
        super();
        this.state = {};
        this.onAddressSelect = this.onAddressSelect.bind(this);
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
        this.props.requestAddresses();
    }

    updateProperty(property, value) {
        let address = this.state.address;
        address[property] = value;
        this.setState({ address: address });
    }

    onAddressSelect(e) {
        this.newAddress = false;
        this.setState({
            displayDialog: true,
            address: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newAddress = true;
        this.setState({
            address: { street: '', number: '', city: '', state: '', country: '' },
            displayDialog: true
        });
    }

    save() {
        if (this.state.address.street != "" && this.state.address.number != "" && this.state.address.city != "" && this.state.address.state != "" && this.state.address.country != "") {
            this.props.saveAddress(this.state.address);
            this.growl.show({ severity: 'success', detail: this.newAddress ? "Data Saved Successfully" : "Data Updated Successfully" });
            let path = '/Address';
            this.props.history.push(path);
        }
    }

    delete() {
        this.props.deleteAddress(this.state.address.addressId);
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
                <DataTable value={this.props.addresses} selectionMode="single" header={header} footer={footer} selection={this.state.selectedAddress} onSelectionChange={e => this.setState({ selectedAddress: e.value })} onRowSelect={this.onAddressSelect} style={{ marginTop: 10 }} scrollable={true} scrollHeight="200px">
                    <Column field="addressId" header="ID" />
                    <Column field="street" header="Rua" />
                    <Column field="number" header="Número" />
                    <Column field="city" header="Cidade" />
                    <Column field="state" header="Estado" />
                    <Column field="country" header="Pais" />
                </DataTable>
                <div>
                    {
                        this.state.address &&
                        <form>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-6">
                                    <label htmlFor="firstName">Nome</label>
                                    <InputText id="firstName" onChange={(e) => { this.updateProperty('firstName', e.target.value) }} value={this.state.address.firstName} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName">Sobrenome</label>
                                    <InputText id="lastName" onChange={(e) => { this.updateProperty('lastName', e.target.value) }} value={this.state.address.lastName} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-4">
                                    <label htmlFor="cpf">Cpf</label>
                                    <InputText id="cpf" onChange={(e) => { this.updateProperty('cpf', e.target.value) }} value={this.state.address.cpf} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email">E-mail</label>
                                    <InputText id="email" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.address.email} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="phone">Celular</label>
                                    <InputMask id="phone" mask="(99)99999-9999" onChange={(e) => { this.updateProperty('phone', e.target.value) }} value={this.state.address.phone} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="form-group col-md-2">
                                    <Button label="Excluir" disabled={this.newAddress ? true : false} icon="pi pi-times" onClick={this.delete} />
                                </div>
                                <div className="form-group col-md-10">
                                    <Button label={this.newAddress ? "Próximo" : "Atualizar"} icon="pi pi-check" onClick={this.save} />
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
        addresses: state.addresses.addresses,
        loading: state.addresses.loading,
        errors: state.addresses.errors,
        forceReload: state.addresses.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Address);