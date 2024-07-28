package com.moviesapp.locationmodule

import android.annotation.SuppressLint
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.tasks.Task
import com.facebook.react.bridge.*

class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val fusedLocationClient: FusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(reactContext)

    override fun getName(): String {
        return "LocationModule"
    }

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        try {
            fusedLocationClient.lastLocation
                .addOnSuccessListener { location ->
                    if (location != null) {
                        val result = Arguments.createMap().apply {
                            putDouble("latitude", location.latitude)
                            putDouble("longitude", location.longitude)
                        }
                        promise.resolve(result)
                    } else {
                        promise.reject("LOCATION_ERROR", "Failed to get location", null)
                    }
                }
                .addOnFailureListener { exception ->
                    promise.reject("LOCATION_ERROR", "Failed to get location", exception)
                }
        } catch (e: SecurityException) {
            promise.reject("PERMISSION_ERROR", "Location permission not granted", e)
        }
    }
}
