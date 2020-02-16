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

class Address extends Component {
    constructor() {
        super();
        this.state = {};
        this.onAddressSelect = this.onAddressSelect.bind(this);
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
        this.props.requestAll();
    }

    updateProperty(property, value) {
        let address = this.state.address;
        address[property] = value;
        this.setState({ address: address });
    }

    onAddressSelect(e) {
        this.newAddress = false;
        this.setState({
            address: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newAddress = true;
        this.setState({
            address: { street: '', number: '', city: '', state: '', country: '', fk_personid: '' }
        });
    }

    save() {
        if (this.state.address.street != "" && this.state.address.number != "" && this.state.address.city != "" && this.state.address.state != "" && this.state.address.country != "") {
            this.state.address.fk_personid = this.props.personId;
            this.props.saveAddress(this.state.address);
            this.growl.show({ severity: 'success', detail: this.newAddress ? "Dados salvos com sucesso!" : "Dados atualizados com sucesso!" });
            this.props.previousPage();
        }
    }

    delete() {
        this.props.deleteAddress(this.state.address.addressId);
        this.growl.show({ severity: 'error', detail: "Dados excluidos com sucesso!" });
        this.addNew();
    }

    render() {

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Dados Cadastrados</div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button variant="contained" color="default" style={{ float: 'left' }} onClick={this.addNew}>Adicionar Endereço</Button>
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div>
                    <div class="row">
                        <div class="col">
                            <DataTable value={this.props.all} selectionMode="single" header={header} footer={footer} selection={this.state.selectedAddress} onSelectionChange={e => this.setState({ selectedAddress: e.value })} onRowSelect={this.onAddressSelect} style={{ marginTop: 10 }} scrollable={true} scrollHeight="200px">
                                <Column field="personId" header="ID" style={{ width: '0em', fontSize: '11px', display: 'none' }} />
                                <Column field="cpf" header="Cpf" style={{ fontSize: '11px', width: '8%', textAlign: 'center' }} />
                                <Column field="firstName" header="Nome" style={{ fontSize: '11px', width: '15%', textAlign: 'center' }} />
                                <Column field="lastName" header="Sobrenome" style={{ fontSize: '11px', width: '15%', textAlign: 'center' }} />
                                <Column field="email" header="E-mail" style={{ fontSize: '11px', width: '15%', textAlign: 'center' }} />
                                <Column field="phone" header="Celular" style={{ fontSize: '11px', width: '10%' }} />
                                <Column field="addressId" header="ID" style={{ width: '0em', fontSize: '11px', display: 'none' }} />
                                <Column field="street" header="Rua" style={{ fontSize: '11px', width: '15%', textAlign: 'center' }} />
                                <Column field="number" header="Número" style={{ fontSize: '11px', width: '5%', textAlign: 'center' }} />
                                <Column field="city" header="Cidade" style={{ fontSize: '11px', width: '7%', textAlign: 'center' }} />
                                <Column field="state" header="Estado" style={{ fontSize: '11px', width: '5%', textAlign: 'center' }} />
                                <Column field="country" header="País" style={{ fontSize: '11px', width: '5%', textAlign: 'center' }} />
                            </DataTable>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.state.address &&
                        <form>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-10">
                                    <TextField id="street" maxLength="50" label="Rua" variant="outlined" onChange={(e) => { this.updateProperty('street', e.target.value) }} value={this.state.address.street} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-2">
                                    <TextField id="number" maxLength="10" label="Número" variant="outlined" onChange={(e) => { this.updateProperty('number', e.target.value) }} value={this.state.address.number} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-4">
                                    <TextField id="city" maxLength="30" label="Cidade" variant="outlined" onChange={(e) => { this.updateProperty('city', e.target.value) }} value={this.state.address.city} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-4">
                                    <TextField id="state" maxLength="30" label="Estado" variant="outlined" onChange={(e) => { this.updateProperty('state', e.target.value) }} value={this.state.address.state} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-4">
                                    <TextField id="country" maxLength="30" label="País" variant="outlined" onChange={(e) => { this.updateProperty('country', e.target.value) }} value={this.state.address.country} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="form-group col-md-2">
                                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} disabled={this.newAddress ? true : false} onClick={this.delete}>Excluir</Button>
                                </div>
                                <div className="form-group col-md-10">
                                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={this.save}> {this.newAddress ? "Salvar" : "Atualizar"} </Button>
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
        all: state.client.all,
        addresses: state.client.addresses,
        personId: state.client.personId,
        loading: state.client.loading,
        errors: state.client.errors,
        forceReload: state.client.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Address);