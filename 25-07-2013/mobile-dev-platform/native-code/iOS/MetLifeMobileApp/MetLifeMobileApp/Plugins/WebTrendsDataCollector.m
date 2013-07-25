#import "WebTrendsDataCollector.h"
#import <Webtrends/Webtrends.h>

@implementation WebTrendsDataCollector


-(void)returnResult:(NSString *)message callback:(NSString *)callback status:(CDVCommandStatus)status
{
    if (status != CDVCommandStatus_OK) {
        NSLog(@"WebTrendsDataCollector.onScreenView encountered an error ==> CDVCommandStatus:%i ErrorMessage:%@", status, message);
    }
    NSLog(@"WebTrendsDataCollector.onScreenView suceeded ==> CDVCommandStatus:%i ErrorMessage:%@", status, message);
    
    if (callback == nil || [callback isEqualToString:@"INVALID"]) {
        return;
    }
    NSString *callbackCheck = [callback substringToIndex:33];
    NSLog(@"callbackCheck=%@", callbackCheck);
    if (![callbackCheck isEqualToString:@"com.WebTrendsDataCollector"]) {
        return;
    }
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:status messageAsString:message];
    
    NSString *js = nil;
    if (status == CDVCommandStatus_OK) {
        js = [result toSuccessCallbackString:callback];
    }
    else {
        js = [result toErrorCallbackString:callback];
    }
    
    [self writeJavascript:js];
}

-(void)onScreenView:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    
    CDVCommandStatus status = CDVCommandStatus_OK;
    NSString *statusMessage = nil;
    
    NSUInteger argc = [arguments count];
    NSString *callback = nil;
    NSString *DCSdcsuri = nil;
    NSString *WTti = nil;
    NSString *WTcg_n = nil;
    NSString *WTz_event = nil;
    NSString *WTsi_n = nil;
    NSString *WTsi_x = nil;
    NSString *WTsi_cs = nil;
    NSString *WTdl = nil;
    NSString *WTcg_s = nil;
    NSString *WTz_tool = nil;
    NSString *WTz_age = nil;
    NSString *WTz_gnd = nil;
    NSString *WTz_small3 = nil;
    NSString *WTz_small4 = nil;
    NSString *WTz_num3 = nil;
    NSString *WTz_num4 = nil;
    
    
    @try {
        WTcg_n = [options objectForKey:@"CNTNT_GRP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_event = [options objectForKey:@"KY_EVNT"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_n = [options objectForKey:@"SCNR_NM"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_x = [options objectForKey:@"SCNR_STEP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_event = [options objectForKey:@"KY_EVNT"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_cs = [options objectForKey:@"SCNR_CS"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTdl = [options objectForKey:@"DL_TG"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTcg_s = [options objectForKey:@"SBGRP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_tool = [options objectForKey:@"TL"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_age = [options objectForKey:@"AGE"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_gnd = [options objectForKey:@"GNDR_CD"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_small3 = [options objectForKey:@"SMLL3"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_small4 = [options objectForKey:@"SMLL4"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_num3 = [options objectForKey:@"NM3"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_num4 = [options objectForKey:@"NM4"];
    }
    @catch (NSException *exception) {
    }
    
    
    NSInteger uemRC = 0;
    
    if (argc > 0) {
        callback = [arguments objectAtIndex:0];
    }
    else {
        status = CDVCommandStatus_INVALID_ACTION;
        statusMessage = @"onSuccess/onFail callback not defined";
    }
    
    if (status == CDVCommandStatus_OK) {
        DCSdcsuri = [options objectForKey:@"URI"];
        WTti = [options objectForKey:@"PG_TTLE"];
    }
    statusMessage = [NSString stringWithFormat:@"WebTrendsCollector.track RumReturnCode=%i", uemRC];
    
    WTEvent *myEvent = [WTEvent eventForScreenView:DCSdcsuri eventDescr:WTti eventType:@"onScreenView" contentGroup:WTcg_n];
    [myEvent setValue:@"true" forCustomParameter:@"sdk"];
    if(WTcg_s != nil)
        [myEvent setValue:WTcg_s forCustomParameter:@"WT.cg_s"];
    if(WTdl != nil)
        [myEvent setValue:WTdl forCustomParameter:@"WT.dl"];
    if(WTsi_cs != nil)
        [myEvent setValue:WTsi_cs forCustomParameter:@"WT.si_cs"];
    if(WTsi_n != nil)
        [myEvent setValue:WTsi_n forCustomParameter:@"WT.si_n"];
    if(WTsi_x != nil)
        [myEvent setValue:WTsi_x forCustomParameter:@"WT.si_x"];
    if(WTz_age != nil)
        [myEvent setValue:WTz_age forCustomParameter:@"WT.z_age"];
    if(WTz_event != nil)
        [myEvent setValue:WTz_event forCustomParameter:@"WT.z_event"];
    if(WTz_gnd != nil)
        [myEvent setValue:WTz_gnd forCustomParameter:@"WT.z_gnd"];
    if(WTz_num3 != nil)
        [myEvent setValue:WTz_num3 forCustomParameter:@"WT.z_num3"];
    if(WTz_num4 != nil)
        [myEvent setValue:WTz_num4 forCustomParameter:@"WT.z_num4"];
    if(WTz_small3 != nil)
        [myEvent setValue:WTz_small3 forCustomParameter:@"WT.z_small3"];
    if(WTz_small4 != nil)
        [myEvent setValue:WTz_small4 forCustomParameter:@"WT.z_small4"];
    if(WTz_tool != nil)
        [myEvent setValue:WTz_tool forCustomParameter:@"WT.z_tool"];
    [self trackEvent:myEvent];
    
    
    [self returnResult:statusMessage callback:callback status:status];
}

-(void)onButtonClick:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    
    CDVCommandStatus status = CDVCommandStatus_OK;
    NSString *statusMessage = nil;
    
    NSUInteger argc = [arguments count];
    NSString *callback = nil;
    NSString *DCSdcsuri = nil;
    NSString *WTti = nil;
    NSString *WTcg_n = nil;
    NSString *WTz_event = nil;
    NSString *WTsi_n = nil;
    NSString *WTsi_x = nil;
    NSString *WTsi_cs = nil;
    NSString *WTdl = nil;
    NSString *WTcg_s = nil;
    NSString *WTz_tool = nil;
    NSString *WTz_age = nil;
    NSString *WTz_gnd = nil;
    NSString *WTz_small3 = nil;
    NSString *WTz_small4 = nil;
    NSString *WTz_num3 = nil;
    NSString *WTz_num4 = nil;
    
    
    @try {
        WTcg_n = [options objectForKey:@"CNTNT_GRP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_event = [options objectForKey:@"KY_EVNT"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_n = [options objectForKey:@"SCNR_NM"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_x = [options objectForKey:@"SCNR_STEP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_event = [options objectForKey:@"KY_EVNT"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTsi_cs = [options objectForKey:@"SCNR_CS"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTdl = [options objectForKey:@"DL_TG"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTcg_s = [options objectForKey:@"SBGRP"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_tool = [options objectForKey:@"TL"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_age = [options objectForKey:@"AGE"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_gnd = [options objectForKey:@"GNDR_CD"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_small3 = [options objectForKey:@"SMLL3"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_small4 = [options objectForKey:@"SMLL4"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_num3 = [options objectForKey:@"NM3"];
    }
    @catch (NSException *exception) {
    }
    
    @try {
        WTz_num4 = [options objectForKey:@"NM4"];
    }
    @catch (NSException *exception) {
    }
    
    
    NSInteger uemRC = 0;
    
    if (argc > 0) {
        callback = [arguments objectAtIndex:0];
    }
    else {
        status = CDVCommandStatus_INVALID_ACTION;
        statusMessage = @"onSuccess/onFail callback not defined";
    }
    
    if (status == CDVCommandStatus_OK) {
        DCSdcsuri = [options objectForKey:@"URI"];
        WTti = [options objectForKey:@"PG_TTLE"];
    }
    statusMessage = [NSString stringWithFormat:@"WebTrendsCollector.track RumReturnCode=%i", uemRC];
    
    WTEvent *myEvent = [WTEvent eventForAction:DCSdcsuri eventDescr:WTti eventType:@"onButtonClick"];
    if(WTcg_n != nil)
        [myEvent setValue:WTcg_n forCustomParameter:@"WT.cg_n"];
    if(WTcg_s != nil)
        [myEvent setValue:WTcg_s forCustomParameter:@"WT.cg_s"];
    if(WTdl != nil)
        [myEvent setValue:WTdl forCustomParameter:@"WT.dl"];
    if(WTsi_cs != nil)
        [myEvent setValue:WTsi_cs forCustomParameter:@"WT.si_cs"];
    if(WTsi_n != nil)
        [myEvent setValue:WTsi_n forCustomParameter:@"WT.si_n"];
    if(WTsi_x != nil)
        [myEvent setValue:WTsi_x forCustomParameter:@"WT.si_x"];
    if(WTz_age != nil)
        [myEvent setValue:WTz_age forCustomParameter:@"WT.z_age"];
    if(WTz_event != nil)
        [myEvent setValue:WTz_event forCustomParameter:@"WT.z_event"];
    if(WTz_gnd != nil)
        [myEvent setValue:WTz_gnd forCustomParameter:@"WT.z_gnd"];
    if(WTz_num3 != nil)
        [myEvent setValue:WTz_num3 forCustomParameter:@"WT.z_num3"];
    if(WTz_num4 != nil)
        [myEvent setValue:WTz_num4 forCustomParameter:@"WT.z_num4"];
    if(WTz_small3 != nil)
        [myEvent setValue:WTz_small3 forCustomParameter:@"WT.z_small3"];
    if(WTz_small4 != nil)
        [myEvent setValue:WTz_small4 forCustomParameter:@"WT.z_small4"];
    if(WTz_tool != nil)
        [myEvent setValue:WTz_tool forCustomParameter:@"WT.z_tool"];
    
    [self trackEvent:myEvent];
    
    
    [self returnResult:statusMessage callback:callback status:status];
}


@end
