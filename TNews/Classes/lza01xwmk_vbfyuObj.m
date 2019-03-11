//
//  lza01xwmk_vbfyuObj.m
//  BGTNews
//
//  Created by 张兵 on 2019/2/28.
//  Copyright © 2019 张兵. All rights reserved.
//

#import "lza01xwmk_vbfyuObj.h"
#import <TGCommunity/TGCommunity.h>

@implementation lza01xwmk_vbfyuObj

+ (lza01xwmk_vbfyuVC *)startInit {
    
    NSBundle *bundle = [lza01xwmk_vbfyuObj bundleWithBundleName:@"TGNews" podName:@"TGNews"];
    
    NSString *zUrl = [[NSString alloc] initWithFormat:@"%@%@",[bundle bundlePath], @"/widget_xw"];
    
    APIConfiguration *configuration = [[APIConfiguration alloc] init];
    // 调试时可以开启WiFi代码同步功能
    configuration.enableWifiSync = NO;
    
    configuration.defaultWidgetPath = zUrl;
    NSLog(@"path = %@",configuration.defaultWidgetPath);

    [[APIManager sharedManager] initSDKWithLaunchOptions:nil configuration:configuration];
    
    NSString *url = @"widget://index.html";
    NSString *name = @"index";
    
    lza01xwmk_vbfyuVC *windowContainer = [lza01xwmk_vbfyuVC windowContainerWithAttribute:@{@"url":url, @"name":name}];
    [windowContainer startLoad];
    return windowContainer;
}

+ (NSBundle *)bundleWithBundleName:(NSString *)bundleName podName:(NSString *)podName{
    if (bundleName == nil && podName == nil) {
        @throw @"bundleName和podName不能同时为空";
    }else if (bundleName == nil ) {
        bundleName = podName;
    }else if (podName == nil) {
        podName = bundleName;
    }
    
    
    if ([bundleName containsString:@".bundle"]) {
        bundleName = [bundleName componentsSeparatedByString:@".bundle"].firstObject;
    }
    //没使用framwork的情况下
    NSURL *associateBundleURL = [[NSBundle mainBundle] URLForResource:bundleName withExtension:@"bundle"];
    //使用framework形式
    if (!associateBundleURL) {
        associateBundleURL = [[NSBundle mainBundle] URLForResource:@"Frameworks" withExtension:nil];
        associateBundleURL = [associateBundleURL URLByAppendingPathComponent:podName];
        associateBundleURL = [associateBundleURL URLByAppendingPathExtension:@"framework"];
        NSBundle *associateBunle = [NSBundle bundleWithURL:associateBundleURL];
        associateBundleURL = [associateBunle URLForResource:bundleName withExtension:@"bundle"];
    }
    
    NSAssert(associateBundleURL, @"取不到关联bundle");
    
    NSLog(@"%@", associateBundleURL);
    //生产环境直接返回空
    return associateBundleURL?[NSBundle bundleWithURL:associateBundleURL]:nil;
}

    
@end
