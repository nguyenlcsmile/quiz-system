import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TableUsers = (props) => {
    const { listUsers } = props;

    return (

        <Table bordered className="text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className='col-4'>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button variant="secondary mx-2">View</Button>{' '}
                                    <Button variant="warning mx-2">Update</Button>{' '}
                                    <Button variant="danger mx-2">Delete</Button>{' '}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableUsers;