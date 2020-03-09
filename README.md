# Fitpal

Fitness assistant.

## Troubleshooting 

### Bad pointing Xcode

```bash
xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'
/Users/USERNAME/Library/Caches/CocoaPods/Pods/External/glog/2263bd123499e5b93b5efe24871be317-1f3da/missing: Unknown `--is-lightweight' option
Try `/Users/USER/Library/Caches/CocoaPods/Pods/External/glog/2263bd123499e5b93b5efe24871be317-1f3da/missing --help' for more information
configure: WARNING: 'missing' script is too old or missing
configure: error: in `/Users/USER/Library/Caches/CocoaPods/Pods/External/glog/2263bd123499e5b93b5efe24871be317-1f3da':
configure: error: C compiler cannot create executables
See `config.log' for more details
```

Try: 

```bash
sudo xcode-select --switch /Applications/Xcode.app
```

Maybe because it's pointing you to where XCode is located on your computer.

### iOS-deploy

```bash
info Found Xcode workspace "fitless.xcworkspace"
error Failed to install the app on the device because we couldn't execute the "ios-deploy" command. Please install it by running "npm install -g ios-deploy" and try again. Run CLI with --verbose flag for more details.
```

Solution:

```bash
npm i -g ios-deploy
```