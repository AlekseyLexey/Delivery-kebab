const generateCourierLocation = (region = null) => {
    const defaultMSKRegion = {
        minLat: 55.573,  
        maxLat: 55.911,  
        minLng: 37.370,  
        maxLng: 37.858,  
        };

    const { minLat, maxLat, minLng, maxLng } = region || defaultMSKRegion;

    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;

    return {
        lat: parseFloat(lat.toFixed(6)),
        lng: parseFloat(lng.toFixed(6)),
    };
};

module.exports = generateCourierLocation;