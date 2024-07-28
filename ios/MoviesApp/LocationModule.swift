import CoreLocation
import React

@objc(LocationModule)
class LocationModule: NSObject, CLLocationManagerDelegate {
    private let locationManager = CLLocationManager()
    private var resolve: RCTPromiseResolveBlock?
    private var reject: RCTPromiseRejectBlock?

    override init() {
        super.init()
        locationManager.delegate = self
    }

    @objc
    func getCurrentLocation(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        self.resolve = resolve
        self.reject = reject
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.first else { return }
        let latitude = location.coordinate.latitude
        let longitude = location.coordinate.longitude

        if let resolve = self.resolve {
            resolve(["latitude": latitude, "longitude": longitude])
            self.resolve = nil
            self.reject = nil
        }

        locationManager.stopUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        if let reject = self.reject {
            reject("LOCATION_ERROR", "Failed to get location", error)
            self.resolve = nil
            self.reject = nil
        }
    }
}
