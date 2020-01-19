import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';

class GnomeDetails extends Component {

    render() {
        const { users, isFetching } = this.props
        const { gnomeId } = this.props.match.params
        const gnome = this.props.users[gnomeId];
        const friendsArr = [];
        if (gnome) {

            gnome.friends.map(function (v, i) {
                return friendsArr.push(users.find(function (element) { return element.name === v }));
            })
            return (
                <div className="card">
                    <img src={gnome.thumbnail} alt="John" />

                    <h5>{gnome.name}</h5>
                    <div className="gnome-details">
                        <b>Details</b>
                        <ul>
                            <li><b>Age</b> - {gnome.age}</li>
                            <li><b>Hair color</b> - {gnome.hair_color}</li>
                            <li><b>Height</b> - {gnome.height}cm</li>
                            <li><b>Weight</b> - {gnome.weight}kg</li>
                        </ul>
                    </div>
                    <div className="gnome-professions">
                        <b>Professions</b>
                        <p className="title">{gnome.professions.join(', ')}</p>
                    </div>
                    <div className="gnome-friends">
                        <b>Friends</b>
                        <ul>
                            {friendsArr.map((f, x) => {
                                return (
                                    <li key={x}>
                                        <Link to={'/gnomes/' + f.id}>{f.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                isFetching && users.length === 0 ? <h2>Loading...</h2> :
                    !isFetching && users.length === 0 && <h2>Empty.</h2>
            )
        }

    }

}

export default withRouter(GnomeDetails);