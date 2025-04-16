import React from 'react';
import AppRoutes from 'routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fa';
import jalali from 'jalali-dayjs';
import dayjs from 'dayjs';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    dayjs.locale('fa');
    dayjs.extend(jalali);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppRoutes />
            </LocalizationProvider>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;