import React, { useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/v1";

function DeliveryForm() {
    const [form, setForm] = useState({
        date: "",
        time: "",
        capacity: "",
        cooling: "false",
        heating: "false",
        maxCost: "",
        lat: "",
        lng: "",
    });

    const [requestApproval, setRequestApproval] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRequestApproval("");
        setIsSubmitting(true);

        // Build payload in the exact structure your backend expects
        const payload = {


            date: form.date,
            time: form.time,
            requirements: {
                capacity: Number(form.capacity),
                cooling: form.cooling === "true",
                heating: form.heating === "true",
                maxCost: Number(form.maxCost),
            },
            delivery: {
                lat: Number(form.lat),
                lng: Number(form.lng),
            },
        };

        try {
            const response = await fetch(`${API_BASE_URL}/deliveries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                setError(`Error: ${response.status} ${response.statusText}`);
            } else {
                const data = await response.json().catch(() => null);
                // You can adjust this depending on what your backend returns
                setRequestApproval("Order accepted! " + (data ? JSON.stringify(data) : ""));
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to backend.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: "500px", marginTop: "20px" }}>
            <form onSubmit={handleSubmit}>
                <h2>Create Delivery</h2>



                <label>
                    Date
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Time
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}

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
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Cooling required?
                    <select name="cooling" value={form.cooling} onChange={handleChange}>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>

                <label>
                    Heating required?
                    <select name="heating" value={form.heating} onChange={handleChange}>
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
                        onChange={handleChange}
                        required
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
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Longitude
                    <input
                        type="number"
                        name="lng"
                        step="0.0001"
                        value={form.lng}
                        onChange={handleChange}
                        required
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

export default DeliveryForm;
