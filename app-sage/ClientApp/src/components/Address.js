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

    async componentDidMount() {
        await this.fetchData();
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
            this.growl.show({ severity: 'success', detail: this.newAddress ? "Data Saved Successfully" : "Data Updated Successfully" });
            this.props.previousPage();
        }
    }

    delete() {
        this.props.deleteAddress(this.state.address.addressId);
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Lista de Endereços</div>;

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
                    <Column field="country" header="País" />
                </DataTable>
                <div>
                    {
                        this.state.address &&
                        <form>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-10">
                                    <label htmlFor="street">Rua</label>
                                    <InputText id="street" onChange={(e) => { this.updateProperty('street', e.target.value) }} value={this.state.address.street} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="number">Número</label>
                                    <InputText id="number" type="number" onChange={(e) => { this.updateProperty('number', e.target.value) }} value={this.state.address.number} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="col-md-4">
                                    <label htmlFor="city">Cidade</label>
                                    <InputText id="city" onChange={(e) => { this.updateProperty('city', e.target.value) }} value={this.state.address.city} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state">Estado</label>
                                    <InputText id="state" onChange={(e) => { this.updateProperty('state', e.target.value) }} value={this.state.address.state} style={{ width: '100%' }} required />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="country">País</label>
                                    <InputText id="country" onChange={(e) => { this.updateProperty('country', e.target.value) }} value={this.state.address.country} style={{ width: '100%' }} required />
                                </div>
                            </div>
                            <div className="form-row" style={{ marginTop: 10 }}>
                                <div className="form-group col-md-2">
                                    <Button label="Excluir" disabled={this.newAddress ? true : false} className="p-button-danger" icon="pi pi-times" onClick={this.delete} />
                                </div>
                                <div className="form-group col-md-10">
                                    <Button label={this.newAddress ? "Salvar" : "Atualizar"} className="p-button-success" icon="pi pi-check" onClick={this.save} />
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