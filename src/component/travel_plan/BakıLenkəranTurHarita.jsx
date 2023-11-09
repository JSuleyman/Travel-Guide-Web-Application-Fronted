import React, { useEffect } from "react";

const BakıLenkəranTurHarita = () => {
    useEffect(() => {
        // Google Haritalar API'yi yükleyin
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();

            const map = new window.google.maps.Map(document.getElementById("harita"), {
                center: { lat: 40.4093, lng: 49.8671 }, // Bakü koordinatları
                zoom: 7, // Harita yaklaştırma düzeyi
            });

            // Yol tarifi için başlangıç ve varış noktalarını belirleyin
            const start = "Bakü, Azerbaycan";
            const end = "Lənkəran, Azerbaycan";

            const request = {
                origin: start,
                destination: end,
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            // Yol tarifi isteği gönderin
            directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    // Haritada rotayı gösterin
                    directionsRenderer.setDirections(result);
                    directionsRenderer.setMap(map);
                }
            });
        };
    }, []); // Boş bağımlılık dizisi, sadece bir kere çalışmasını sağlar

    return <div id="harita" style={{ width: "100%", height: "500px" }}></div>;
};

export default BakıLenkəranTurHarita;
