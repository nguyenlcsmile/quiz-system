
const TableUsers = (props) => {
    const { listUsers, handleViewUser, handleDeleteUser, handleUpdateUser } = props;

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
                                                            <button className='btn btn-warning mx-4'
                                                                onClick={() => handleUpdateUser(user)}>
                                                                Update
                                                            </button>
                                                            <button className='btn btn-danger'
                                                                onClick={() => handleDeleteUser(user)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {listUsers && listUsers.length === 0 &&
                                            <tr>
                                                <td colSpan={'4'}>Not fault data</td>
                                            </tr>
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