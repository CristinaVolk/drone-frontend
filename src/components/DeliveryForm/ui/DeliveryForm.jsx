import React from "react";

import {useDeliveryForm} from "../model/hooks/useDeliveryForm/useDeliveryForm";


export function DeliveryForm() {
    const {
        form,
        handleChange,
        handleSubmit,
        isSubmitting,
        requestApproval,
        error
    } = useDeliveryForm();


    return (
        <div style={{ maxWidth: "500px", marginTop: "20px" }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Date
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={(event)=> handleChange(event)}
                    />
                </label>

                <label>
                    Time
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={(event)=> handleChange(event)}
                    />
                </label>

                <h3>Requirements</h3>

                <label>
                    Capacity
                    <input
                        type="number"
                        name="capacity"
                        min="1"
                        value={form.capacity}
                        onChange={(event)=> handleChange(event)}
                        required
                    />
                </label>

                <label>
                    Cooling required?
                    <select
                        name="cooling"
                        value={form.cooling}
                        onChange={(event)=> handleChange(event)}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>

                <label>
                    Heating required?
                    <select
                        name="heating"
                        value={form.heating}
                        onChange={(event)=> handleChange(event)}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>

                <label>
                    Max Cost
                    <input
                        type="number"
                        name="maxCost"
                        min="1"
                        value={form.maxCost}
                        required
                        onChange={(event)=> handleChange(event)}
                    />
                </label>

                <h3>Delivery Location</h3>

                <label>
                    Latitude
                    <input
                        type="number"
                        name="lat"
                        step="0.0001"
                        value={form.lat}
                        required
                        onChange={(event)=> handleChange(event)}
                    />
                </label>

                <label>
                    Longitude
                    <input
                        type="number"
                        name="lng"
                        step="0.0001"
                        value={form.lng}
                        required
                        onChange={(event)=> handleChange(event)}
                    />
                </label>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create Delivery"}
                </button>
            </form>

            {requestApproval && (
                <p style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>{requestApproval}</p>
            )}
            {error && (
                <p style={{ marginTop: "10px", whiteSpace: "pre-wrap", color: "red" }}>{error}</p>
            )}
        </div>
    );
}