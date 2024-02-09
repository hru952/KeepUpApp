import { AnalyticsIcon, CashIcon, CutIcon } from 'chakra-ui-ionicons';

//Defines the items in the sidebar of the expense tracker

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <AnalyticsIcon />,
        link: '/dashboard'
    },
   /* {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/dashboard",
    },*/
    {
        id: 3,
        title: "Incomes",
        icon: <CashIcon />,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: <CutIcon />,
        link: "/dashboard",
    },
]