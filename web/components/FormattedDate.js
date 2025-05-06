"use client";

import Moment from 'react-moment';

const FormattedDate = ({ date }) => {
    return (
        <Moment format='Do MMMM YYYY, ha'>
            {date}
        </Moment>
    );
};

export default FormattedDate;
