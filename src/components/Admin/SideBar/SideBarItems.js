import { RiDashboardLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';

export const SideBarItems = [
    {
        title: 'Dashboard',
        to: '/admins',
        icon: <RiDashboardLine className="icon-sidebar" />,
        cName: 'active',
        arrow: 'none',
        status: false
    },
    {
        title: 'Manager',
        to: '',
        icon: <MdManageAccounts className="icon-sidebar" />,
        cName: '',
        arrow: '',
        status: true
    }
]

export const ManagerItems = [
    {
        title: 'Users',
        to: '/admins/manager-users',
        cName: ''
    },
    {
        title: 'Quiz',
        to: '/admins',
        cName: ''
    },
    {
        title: 'Questions',
        to: '/admins',
        cName: ''
    }

]