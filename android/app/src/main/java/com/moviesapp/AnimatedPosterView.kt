package com.moviesapp

import android.content.Context
import android.util.AttributeSet
import android.widget.ImageView
import android.widget.RelativeLayout
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions

class AnimatedPosterView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : RelativeLayout(context, attrs, defStyleAttr) {

    private val imageView: ImageView

    init {
        imageView = ImageView(context).apply {
            layoutParams = RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT
            ).apply {
                addRule(RelativeLayout.CENTER_IN_PARENT)
            }
            scaleType = ImageView.ScaleType.FIT_XY // Set scaleType to FIT_XY to stretch the image
        }
        addView(imageView)
    }

    fun setImageUrl(url: String) {
        Glide.with(context)
            .load(url)
            .apply(RequestOptions().placeholder(R.drawable.placeholder))
            .transition(DrawableTransitionOptions.withCrossFade()) // Smooth transition
            .into(imageView)
    }
}
