import {useState} from "react";

import {DELIVERIES_ENDPOINT} from "../../../../../shared/constants/endpoints";
import {createPayload} from "../../helpers/delivery";

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
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliverySubmittedId, setDeliverySubmittedId] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        const payload = createPayload(form);

        try {
            const response = await fetch(DELIVERIES_ENDPOINT, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                alert("Error creating delivery");
                setError(`Error: ${response.status} ${response.statusText}`);
            } else {
                const orderPlacedData = await response.json();

                setDeliverySubmittedId(orderPlacedData.deliverId);
            }
        } catch (err) {
            setError("Failed to connect to backend.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        error,
        isSubmitting,
        deliverySubmittedId,
        handleChange,
        handleSubmit,
    }
};