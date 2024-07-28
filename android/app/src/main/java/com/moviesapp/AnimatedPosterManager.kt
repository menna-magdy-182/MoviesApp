package com.moviesapp

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.moviesapp.AnimatedPosterView

class AnimatedPosterManager : SimpleViewManager<AnimatedPosterView>() {

    override fun getName(): String {
        return "AnimatedPoster"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): AnimatedPosterView {
        return AnimatedPosterView(reactContext)
    }

    @ReactProp(name = "imageUrl")
    fun setImageUrl(view: AnimatedPosterView, imageUrl: String) {
        view.setImageUrl(imageUrl)
    }
}
