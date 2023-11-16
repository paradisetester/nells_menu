
import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";


const apiKey = 'AIzaSyCjKdnkQAnpAmK504Tp7UOETL5Jihg2JYc'; // Replace with your API key
const mapStyles = {
    width: '400px',   // Set the width to 100% of its container
    height: '400px', // Set the height to 400 pixels
};

const center = {
    lat: 25.5941, // Latitude of the exact address
    lng: 85.1376, // Longitude of the exact address
};


function RestaurantMap(props) {

    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

    const onMapClick = (mapProps, map, clickEvent) => {
        const latitude = clickEvent.latLng.lat();
        const longitude = clickEvent.latLng.lng();
        setCoordinates({ latitude, longitude });
    };



    return (
        <div className="map_design">
            <Map
                style={mapStyles}
                google={props.google}
                zoom={14} // Set the initial zoom level
                initialCenter={center} // Set the initial center of the map
                onClick={onMapClick}
            >
                <Marker
                    title={props.restaurant.address || ""}
                    // name={props.restaurant.address || ""}
                    name="patna bihar"
                    position={center}// Set the marker's position with the address's coordinates
                />
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: apiKey, // Replace with your API key
})(RestaurantMap);
