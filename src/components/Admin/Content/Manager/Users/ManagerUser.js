import './ManagerUser.scss';
import TableUsers from './TableUsers';
import { getAllUsers } from '../../../../../services/apiServices';
import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import { AiOutlinePlus } from 'react-icons/ai';

function Manager() {
    const [listUsers, setListUsers] = useState([]);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    useEffect(() => {
        fectchListUser();
    }, []);

    const fectchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    return (
        <>
            <div className='manager-title'>
                Quản lý người dùng
            </div>

            <div className='manager-user-content'>
                <button type="button" className="btn btn-primary"
                    onClick={() => setShowModalCreateUser(true)}
                >
                    <AiOutlinePlus className='mx-2' />
                    Create new user
                </button>

                <div className='table-users'>
                    <TableUsers
                        listUsers={listUsers}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>

        </>
    )
}

export default Manager;