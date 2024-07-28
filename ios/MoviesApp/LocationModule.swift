import CoreLocation
import React

@objc(LocationModule)
class LocationModule: NSObject, CLLocationManagerDelegate {
    private let locationManager = CLLocationManager()
    private var locationPromise: RCTPromiseResolveBlock?
    private var locationRejecter: RCTPromiseRejectBlock?

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }

    @objc
    func getCurrentLocation(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        if locationPromise != nil {
            reject("E_LOCATION_REQUEST_ALREADY_IN_PROGRESS", "A location request is already in progress", nil)
            return
        }
        
        locationPromise = resolve
        locationRejecter = reject

        // Check authorization status
        let status = CLLocationManager.authorizationStatus()
        switch status {
        case .notDetermined:
            // Request permission and wait for the response
            locationManager.requestWhenInUseAuthorization()
        case .authorizedWhenInUse, .authorizedAlways:
            // Permission granted, request location
            locationManager.requestLocation()
        case .denied, .restricted:
            // Permission denied or restricted
            reject("E_LOCATION_PERMISSION_DENIED", "Location permission denied or restricted", nil)
            locationPromise = nil
            locationRejecter = nil
        @unknown default:
            reject("E_LOCATION_UNKNOWN", "Unknown authorization status", nil)
            locationPromise = nil
            locationRejecter = nil
        }
    }

    // CLLocationManagerDelegate methods
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else {
            if let rejecter = locationRejecter {
                rejecter("E_LOCATION_FETCH_FAILED", "Failed to fetch location", nil)
                locationRejecter = nil
                locationPromise = nil
            }
            return
        }

        let locationData: [String: Any] = [
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude
        ]
        if let promise = locationPromise {
            promise(locationData)
            locationPromise = nil
            locationRejecter = nil
        }
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        if let rejecter = locationRejecter {
            rejecter("E_LOCATION_FETCH_FAILED", "Failed to fetch location", error)
            locationRejecter = nil
            locationPromise = nil
        }
    }

    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        // When the user changes the permission status, check if permission is granted
        if status == .authorizedWhenInUse || status == .authorizedAlways {
            // Permission granted, request location
            if let promise = locationPromise {
                locationManager.requestLocation()
            }
        } else if status == .denied || status == .restricted {
            // Permission denied or restricted
            if let rejecter = locationRejecter {
                rejecter("E_LOCATION_PERMISSION_DENIED", "Location permission denied or restricted", nil)
                locationRejecter = nil
                locationPromise = nil
            }
        }
    }
}
