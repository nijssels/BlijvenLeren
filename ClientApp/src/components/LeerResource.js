import React, { Component } from 'react';

export class LeerResource extends Component {
  static displayName = LeerResource.name;

  constructor(props) {
    super(props);
    this.state = {
      item: Object.assign({}, props.item)
    };
    this.saveResource = this.saveResource.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateNaam = this.updateNaam.bind(this);
    this.updateOmschrijving = this.updateOmschrijving.bind(this);
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="naamInput">Naam</label>
          <input type="text" className="form-control" id="naamInput" defaultValue={this.state.item.naam} onChange={this.updateNaam} />
        </div>
        <div className="form-group">
          <label htmlFor="omschrijvingTextArea">Example textarea</label>
          <textarea className="form-control" id="omschrijvingTextArea" defaultValue={this.state.item.omschrijving} onChange={this.updateOmschrijving} rows="3"/>
        </div>
        <button className="btn btn-primary" onClick={this.cancel}>Cancel</button>
        <button //style={this.state.item.naam == "" && { disabled: true }}
                className="btn btn-primary"
                onClick={() => { this.saveResource(this.state.item) }}>Save</button>
      </form>
    );
  }

  updateNaam(e) {
    var nieuwItem = this.state.item;
    nieuwItem.naam = e.target.value;
    this.setState({item: nieuwItem})
  }

  updateOmschrijving(e) {
    var nieuwItem = this.state.item;
    nieuwItem.omschrijving = e.target.value;
    this.setState({ item: nieuwItem })
  }

  saveResource(item) {
    this.props.save(item)
  }
  cancel() {
    this.props.cancel()
  }
}
