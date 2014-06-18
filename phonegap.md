## A Simple PhoneGap application

#### The PhoneGap lifecycle of an application


#### Installing Cordova CLI

Cordova comes with a **command line interface** to commands such as:

- starting a new project
- adding a platform (for us it will be ```android``` and ```ios```)
- and many more...

To install it run:

```js
sudo npm install -g cordova-cli
```

#### Starting the CFGMessenger

You can create a seed PhoneGap project with the following command.

```js
$ cordova create com.codefirstgirl.phonegap CFGMessenger
```

**Challenge:** Launch the app in Chrome

#### Adding the platforms

As you now know, the ```www``` folder contains all our "web" code. But to run on actual devices, we need more configuration. Luckily, cordova can handle this for us.

The generic command to add a platform is:

```js
$ cordova platform add <platform_name>
```

**Challenge:** Add the ios platform to your project (the platform name is ```ios```)

**Challenge:** Add the android one too (the platform name is ```android```)

#### Running the app in emulators

To run the app on the ios simulator you have to run two commands.

1. Build the app

	```cordova build ios```

2. Launch the CFGMessenger Xcode project by double-clicking the ```.xcodeproj``` at:

	```platforms/ios/CFGMessenger.xcodeproj```
<br />
3. Selector the device you want to test on and click the "play" button

#### Wrap up

In this section we learned how to start a new **PhoneGap** project what approach to take for running the app on Android and iOS.

In the next section we'll start building the User Interface for CFGMessenger.

## Bonus

#### Prevent the status from collapsing on the content on iOS 7

#### Make sure the onDeviceReady event gets fired