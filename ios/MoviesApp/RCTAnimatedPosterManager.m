#import "RCTAnimatedPosterManager.h"
#import "RCTAnimatedPosterView.h"

@implementation RCTAnimatedPosterManager

RCT_EXPORT_MODULE(AnimatedPoster)

- (UIView *)view {
    return [[RCTAnimatedPosterView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(imageUrl, NSString)

@end
