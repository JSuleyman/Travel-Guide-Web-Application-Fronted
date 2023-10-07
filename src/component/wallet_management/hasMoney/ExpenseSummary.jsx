import React from 'react';
import './ExpenseSummary.css'
import { formatDate } from '../../../utils/formatDateTime';
import { addSeperateNumber } from '../../../utils/addSeperateNumber';

function ExpenseSummary({ data }) {
    var expenseDifference = 0;

    data.filter(el => formatDate(el.localDateTime) === formatDate(new Date)).forEach((a => {
        expenseDifference += a.cost;
    }))

    return (
        <div className="expense-summary">
            <h2>Bugünkü Toplam Xərc</h2>
            <p className="expense-difference">{addSeperateNumber(expenseDifference)} ₼</p>
        </div>
    );
}

export default ExpenseSummary;
