import './ManagerUser.scss';
import { getAllUsers, getUserWithPaginate } from '../../../../../services/apiServices';
import { useEffect, useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import ModalUpdateUser from './ModalUpdateUser';
import { AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import TableUserPaginate from './TableUserPaginate';

function Manager() {
    const LimitUser = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [listUsers, setListUsers] = useState([]);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});

    useEffect(() => {
        // fectchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fectchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LimitUser);
        if (res.EC === 0) {
            // console.log(res.DT.users);
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages)
        }
    }

    const handleViewUser = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    const handleUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetData = () => {
        setDataView({});
        setDataDelete({});
        setDataUpdate({});
    }

    return (
        <>
            <div className="manager-title">
                <div className='row'>
                    <h3>Manager Users</h3>
                </div>
            </div>

            <div className='manager-user-content'>
                <button type="button" className="btn btn-outline-primary btn-create"
                    onClick={() => setShowModalCreateUser(true)}>
                    <AiOutlinePlus className='mx-2 fs-2' />
                    Create new user
                </button>

                <div className='table-users'>
                    {/* <TableUsers
                        listUsers={listUsers}
                        handleViewUser={handleViewUser}
                        handleDeleteUser={handleDeleteUser}
                        handleUpdateUser={handleUpdateUser}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleViewUser={handleViewUser}
                        handleDeleteUser={handleDeleteUser}
                        handleUpdateUser={handleUpdateUser}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fectchListUsers={fectchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetData={resetData}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    resetData={resetData}
                    fectchListUsers={fectchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    resetData={resetData}
                    fectchListUsers={fectchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </>
    )
}

export default Manager;