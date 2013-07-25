#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface WebTrendsDataCollector : CDVPlugin

-(void)onScreenView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void)onButtonClick:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
