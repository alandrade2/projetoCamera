import { useState, useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';

export default () => {

    const [errorMsg, setErrorMgs] = useState(null);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        (async function loadPosition() {
            const result = requestMultiple([
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            ]).then(
                (statuses) => {
                    const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
                    const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION];
                    if (Platform.Version < 29) {
                        if (statusFine == 'granted') {
                            return true
                        } else {
                            setErrorMgs('Usuário não aceitou solicitação de uso do GPS');
                        }
                        if (statusFine == 'granted' && statusBack == 'granted') {
                            return true
                        } else {
                            setErrorMgs('Usuário não aceitou solicitação de uso do GPS');
                        }
                    }
                }
            )
            if (result) {
                await Geolocation.getCurrentPosition(
                    ({ coords }) => {
                        setCoords({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        })
                    }, (error) => {
                        setErrorMgs('Não foi possivel a localização!');
                    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, showLocationDialog: true }
                )
            }
        })()
    }, [])

    return [errorMsg, coords]
}
