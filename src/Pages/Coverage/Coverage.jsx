import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';
import { useRef } from 'react';

const Coverage = () => {

    const position = [23.68, 90.35]
    const serviceCenters = useLoaderData()

    const mapref = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))

        if (district) {
            const coord = [district.latitude, district.longitude]
            console.log(district, coord)
            mapref.current.flyTo(coord, 14)
        }
    }

    return (
        <div className='bg-white rounded-2xl px-20 py-15'>
            <h2 className="text-4xl text-primary font-bold mb-5">We are available in all districts</h2>

            <div>
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow" name='location' placeholder="Search" />
                    </label>
                </form>
            </div>

            <div className='border w-full h-[600px] my-10'>
                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className='h-[600px]'
                    ref={mapref}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        serviceCenters.map(center => <Marker position={[center.latitude, center.longitude]}>
                            <Popup>
                                {center.district}
                                <br />
                                Service Area: {center.covered_area.join(', ')}
                            </Popup>
                        </Marker>)
                    }

                </MapContainer>
            </div>

        </div>
    );
};

export default Coverage;