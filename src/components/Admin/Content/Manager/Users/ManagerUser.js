import './ManagerUser.scss';
import TableUsers from './TableUsers';
import { getAllUsers } from '../../../../../services/apiServices';
import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import ModalViewUser from './ModalViewUser';
import { AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function Manager() {
    const [listUsers, setListUsers] = useState([]);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataView, setDataView] = useState({});

    useEffect(() => {
        fectchListUser();
    }, []);

    const fectchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const handleViewUser = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }

    const resetData = () => {
        setDataView({});
    }

    return (
        <>
            <div className="manager-title">
                <div className='row'>
                    <h3>Quản lý người dùng</h3>
                </div>
            </div>

            <div className='manager-user-content'>
                <button type="button" className="btn btn-outline-primary btn-create"
                    onClick={() => setShowModalCreateUser(true)}>
                    <AiOutlinePlus className='mx-2 fs-2' />
                    Create new user
                </button>

                <div className='table-users'>
                    <TableUsers
                        listUsers={listUsers}
                        handleViewUser={handleViewUser}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetData={resetData}
                />
            </div>

        </>
    )
}

export default Manager;