import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableUsers = (props) => {
    const { listUsers, handleViewUser } = props;

    return (
        <section>
            <div className="row">
                <div className="card">
                    <div className='card-content'>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-lg mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th width="30%">USERNAME</th>
                                            <th width="30%">EMAIL</th>
                                            <th width="10%">ROLE</th>
                                            <th width="20%">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listUsers && listUsers.length > 0 &&
                                            listUsers.map((user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-bold-500">{user.id}</td>
                                                        <td>{user.username}</td>
                                                        <td className="text-bold-500">{user.email}</td>
                                                        <td className="text-bold-500">{user.role}</td>
                                                        <td className="text-bold-500 d-flex">
                                                            <button className='btn btn-secondary'
                                                                onClick={() => handleViewUser(user)}>
                                                                View
                                                            </button>
                                                            <button className='btn btn-warning mx-4'>Update</button>
                                                            <button className='btn btn-danger'>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TableUsers;