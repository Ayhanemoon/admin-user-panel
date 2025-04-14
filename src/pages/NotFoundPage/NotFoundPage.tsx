import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
    function convertToPersianDigits(input: string): string {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return input.replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
    }
    return (
        <div className="not-found-page">
            <h1>404 - صفحه پیدا نشد</h1>
            <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
            <Link to="/" className="not-found-page__link">
                به صفحه اصلی بروید
            </Link>
            <p>برای کمک بیشتر با پشتیبانی تماس بگیرید.</p>
            <p>تلفن: {convertToPersianDigits('123-456-7890')}</p>
        </div>
    );
};

export default NotFoundPage;