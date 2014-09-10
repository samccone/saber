//
//  ViewController.m
//  Saber
//
//  Created by Fabian Canas on 9/10/14.
//  Copyright (c) 2014 Fabian Canas. All rights reserved.
//

#import "ViewController.h"
#import <CoreMotion/CoreMotion.h>

@interface ViewController ()
@property (nonatomic, strong) CMMotionManager *motionManager;
@property (nonatomic, strong) CMDeviceMotion *motion;
@property (weak, nonatomic) IBOutlet UILabel *orientationLabel;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.motionManager = [[CMMotionManager alloc] init];
    
    [self.motionManager startDeviceMotionUpdatesToQueue:[[NSOperationQueue alloc] init]
                                            withHandler:^(CMDeviceMotion *motion, NSError *error) {
                                                self.motion = motion;
                                            }];
}

- (void)viewWillAppear:(BOOL)animated
{
    NSTimer *timer = [NSTimer timerWithTimeInterval:0.05
                            target:self
                          selector:@selector(updateMotionLabels)
                          userInfo:nil
                           repeats:YES];
    [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
}

- (void)updateMotionLabels
{
    CMAttitude *a = self.motion.attitude;
    self.orientationLabel.text = [NSString stringWithFormat:@"pitch: %f\nroll: %f\n yaw: %f",a.pitch, a.roll, a.yaw];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
