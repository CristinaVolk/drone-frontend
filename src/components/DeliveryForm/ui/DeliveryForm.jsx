import React from "react";

import {useDeliveryForm} from "../model/hooks/useDeliveryForm/useDeliveryForm";
import {Input} from "../../Input/ui/Input";
import './DeliveryForm.css';
import {Select} from "../../Select/ui/Select";
import {WindSpeedByLocation} from "../../WindSpeedByLocation/ui/WindSpeedByLocation";
import {DeliverySubmittedSuccess} from "../../DeliverySubmittedSuccess/ui/DeliverySubmittedSuccess";


export function DeliveryForm() {
    const {
        form,
        deliverySubmittedId,
        handleChange,
        handleSubmit,
        isSubmitting,
        error
    } = useDeliveryForm();


    return (
        <>
            <div className="delivery-form-container">
                <form
                    className="delivery-form"
                    onSubmit={handleSubmit}
                >
                    <Input
                        name='date'
                        label='Date'
                        type='date'
                        value={form.date}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />
                    <Input
                        name='time'
                        label='Time'
                        type='time'
                        value={form.time}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />

                    <h3 className="delivery-form-input-title">Requirements</h3>
                    <Input
                        min={1}
                        type='number'
                        name='capacity'
                        label='Capacity'
                        value={form.capacity}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />

                    <Select
                        label='Cooling required?'
                        name="cooling"
                        value={form.cooling}
                        onSelectionChange={(event)=> handleChange(event)}
                        options={[
                            {label: "False", value: "false"},
                            {label: "True", value: "true"}
                        ]}
                    />
                    <Select
                        label='Heating required?'
                        name="heating"
                        value={form.heating}
                        onSelectionChange={(event)=> handleChange(event)}
                        options={[
                            {label: "False", value: "false"},
                            {label: "True", value: "true"}
                        ]}
                    />
                    <Input
                        min={1}
                        type='number'
                        name='maxCost'
                        label='Max Cost'
                        value={form.maxCost}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />

                    <h3 className="delivery-form-input-title">Delivery Location</h3>
                    <Input
                        type='number'
                        name='lat'
                        step="0.0001"
                        label='Latitude'
                        value={form.lat}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />
                    <Input
                        type='number'
                        name="lng"
                        step="0.0001"
                        label='Longitude'
                        value={form.lng}
                        required={true}
                        onInputChange={(event)=> handleChange(event)}
                    />

                    {form.lat && form.lng
                        ? <WindSpeedByLocation lat={form.lat} lng={form.lng} />
                        : null
                    }

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="delivery-form-button"
                    >
                        {isSubmitting ? "Submitting..." : "Create Delivery"}
                    </button>
                </form>

                {error && (
                    <p className="delivery-form-text delivery-form-error">{error}</p>
                )}
            </div>

            { deliverySubmittedId && <DeliverySubmittedSuccess deliverySubmittedId={deliverySubmittedId} />}
        </>
    );
}