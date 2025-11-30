import {DronePathMap} from "../../../components/DronePathMap/ui/DronePathMap";
import {useParams} from "react-router-dom";


export const TrackOrderPagePage = () => {
    const { id } = useParams();

    return (
        <>
            <h1>Tracking Delivery ID: {id}</h1>

            <DronePathMap
                start={{ lat: 55.944, lng: -3.206 }} // Point A
                end={{ lat: 55.9533, lng: -3.1883 }} // Point B
                speedMs={12}
            />
        </>
    )
};








