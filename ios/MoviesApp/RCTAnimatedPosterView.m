#import "RCTAnimatedPosterView.h"
#import <SDWebImage/SDWebImage.h>

@implementation RCTAnimatedPosterView {
    UIImageView *_imageView;
}

- (instancetype)init {
    if (self = [super init]) {
        _imageView = [[UIImageView alloc] initWithFrame:self.bounds];
        _imageView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _imageView.contentMode = UIViewContentModeScaleToFill; // Stretch image to fill both width and height
        _imageView.image = [UIImage imageNamed:@"placeholder"];
        [self addSubview:_imageView];
    }
    return self;
}

- (void)setImageUrl:(NSString *)imageUrl {
    _imageUrl = imageUrl;
    
    NSURL *url = [NSURL URLWithString:imageUrl];
    
    UIImage *placeholder = [UIImage imageNamed:@"placeholder"];

    // Set placeholder image immediately
    // dispatch_async(dispatch_get_main_queue(), ^{
        _imageView.image = placeholder;
        _imageView.alpha = 1.0;
    // });

    // Start loading the image
    [_imageView sd_setImageWithURL:url
                 placeholderImage:placeholder
                          options:SDWebImageRefreshCached
                        progress:nil
                       completed:^(UIImage * _Nullable image, NSError * _Nullable error, SDImageCacheType cacheType, NSURL * _Nullable imageURL) {
        if (image) {
            // Define the fade animation block
            [UIView transitionWithView:_imageView
                              duration:2
                               options:UIViewAnimationOptionTransitionCrossDissolve
                            animations:^{
                                _imageView.image = image;
                            } completion:nil];
        } else {
            // Handle cases where image is nil, keep the placeholder
            _imageView.image = placeholder;
            _imageView.alpha = 1.0;
        }
    }];
}

@end
