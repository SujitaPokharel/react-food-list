import React, { Component } from 'react';
import fetch from 'node-fetch';
import { Table } from 'reactstrap';


export class List extends Component {

    state = {
        list: []
    }

    componentWillMount() {
        fetch('https://api.nal.usda.gov/ndb/search/?format=json&&max=25&offset=0&api_key=72uBmLyZAbzvo6dqvXQxcCtzMy3sj0I6m3THr2yu')
            .then((res) => res.json())
            .then((body) => {
                console.log(body)
                this.setState({ list: body.list.item })
            });
    }

    render() {
        if (this.state.list.length === 0) {
            return (<span>Loading ....</span>);
        }
        return (
            <Table dark>
                <thead>
                    <tr scope="row">
                        <th>ID</th>
                        <th>Group</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.list.map((item) => (
                        <tr key={item.ndbno} scope="row">
                            <td>{item.ndbno}</td>
                            <td>{item.group}</td>
                            <td>{item.name}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>
        )
    }
}
