import {DeliveryForm} from "../../../components/DeliveryForm/ui/DeliveryForm";

export const CreateOrderPagePage = (props) => {
    const { title } = props

    return (
        <>
            <h1>{title}</h1>
            <DeliveryForm />
        </>
    )
}