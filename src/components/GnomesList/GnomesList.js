import React, { Component } from 'react';
import { Table } from 'reactstrap';
import GnomesListItem from './GnomesListItem';

class GnomesList extends Component {

    render() {
        const { users } = this.props
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Professions</th>
                        <th>Friends n°</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, x) => {
                        return (
                            <GnomesListItem user={u} key={x} />
                        )
                    })}
                </tbody>
            </Table>
        )
    }

}

export default GnomesList;