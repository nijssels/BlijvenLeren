import React, { Component } from 'react';
import { LeerResource } from './LeerResource';

export class LeerResourceList extends Component {
    static displayName = LeerResourceList.name;

    constructor(props) {
        super(props);
        this.state = {
            leerresources: [],
            item: null,
            loading: true
        };
        this.removeResource = this.removeResource.bind(this);
        this.editResource = this.editResource.bind(this);
        this.addResource = this.addResource.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        this.retrieveLeerResources();
    }

    async retrieveLeerResources() {
        const response = await fetch('leerresource');
        const data = await response.json();
        this.setState({ leerresources: data, loading: false });
    }

    render() {
        return (
          <div>
            <h1 id="tabelLabel" >Leer resources</h1>
            {
                this.state.loading
                ? <p><em>Loading...</em></p>
                : <div>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Titel</th>
                                <th>Beschrijving</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.leerresources.map(leerresource =>
                                <tr key={leerresource.id}
                                    style={this.state.item ? { cursor: 'not-allowed'} : { cursor: 'pointer' }}
                                    onClick={() => this.editResource(leerresource)}>
                                    <td>{leerresource.naam}</td>
                                    <td>{leerresource.omschrijving}</td>
                                    <td>
                                      <button className="btn btn-primary"
                                              style={this.state.item && { visibility: 'hidden' }}
                                              onClick={
                                                (e) => {
                                                  e.stopPropagation();
                                                  this.removeResource(leerresource)
                                                }}>Verwijder</button>
                                    </td>
                                </tr>, this)}
                        </tbody>
                        </table>
                        {this.state.item != null
                          ? <LeerResource save={this.onSave}
                                          cancel={this.onCancel}
                                          item={this.state.item} />
                          : <div><button className="btn btn-primary" onClick={this.addResource}>Add</button></div>
                        }
                  </div>
            }
            </div>);
    }

    editResource(item) {
      this.setState({
          item: item
      });
    }

    addResource() {
      this.setState({
        item: {}
      });
    }

    async onSave(leerResource) {
      await fetch('leerresource', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leerResource)
      })
      .then(response => {
        let savedLeerResource = response.json();
        let nieuweLeerResources = this.state.leerresources.map(lr => {
          if (lr.id === savedLeerResource.id) {
            return savedLeerResource
          }
          else {
            return lr;
          }
        });

        this.setState({
          item: null,
          leerresources: nieuweLeerResources
        });
      })
    }

    async removeResource(removalitem) {
      await fetch('leerresource', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(removalitem)
      })
      .then(response => {
        this.setState({
          leerresources: this.state.leerresources.filter(
            leerresource => { return leerresource.id !== removalitem.id; })
        })
      })
    }

    onCancel() {
      this.setState({
        item: null
      });
    }
}
