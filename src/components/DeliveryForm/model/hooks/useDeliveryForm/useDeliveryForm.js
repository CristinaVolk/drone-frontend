import {useState} from "react";

import {DELIVERIES_ENDPOINT} from "../../../../../shared/constants/endpoints";

export const useDeliveryForm = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRequestApproval("");
        setIsSubmitting(true);

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
            const response = await fetch(DELIVERIES_ENDPOINT, {
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

                setRequestApproval("Order accepted! " + (data ? JSON.stringify(data) : ""));
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to backend.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        error,
        isSubmitting,
        requestApproval,
        handleChange,
        handleSubmit,
    }
};