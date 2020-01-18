import React, { Component } from 'react';

class GnomesListItem extends Component {

    render() {
        const { user } = this.props
        return (
            <tr>
                <td><img src={user.thumbnail} width="50" height="50" alt={user.name} /></td>
                <td>{user.name}</td>
                <td align="center">{user.age}</td>
                <td align="right">{user.professions.join(', ')}</td>
                <td align="center">{user.friends.length}</td>
            </tr>
        )
    }

}

export default GnomesListItem;