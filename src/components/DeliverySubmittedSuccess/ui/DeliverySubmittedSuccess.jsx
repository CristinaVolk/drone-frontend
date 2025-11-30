import React from "react";
import {Link} from "react-router-dom";

import './DeliverySubmittedSuccess.css';

export const DeliverySubmittedSuccess = (props) => {
    const {deliverySubmittedId} = props;

    return (
        <div>
            <h1>Delivery Request Submitted</h1>

            <p>Your delivery request has been successfully received.</p>
            <p>Your Delivery ID is:</p>

            <h2 style={{ color: "#2e6fdf" }}>{deliverySubmittedId}</h2>

            <p>Please save this ID — you will need it to track your order.</p>

            <Link to={`../track-order/${deliverySubmittedId}`}>Click here to track your order</Link>
        </div>
    )
}