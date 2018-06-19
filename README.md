# coffeecup




удалить плагин cordova-social-vk из packages.json, config.xml, если он добавлен
npm install
cordova platform add ios, android
руками добавить папку cordova-social-vk
cordova plugin add cordova-social-vk  --variable VK_APP_ID=6356607

изменить папку вк в плагинах, потом убить папку в иос плагинах и перебилдить


 <plugin name="cordova-social-vk" spec="~1.0.5">
        <variable name="VK_APP_ID" value="6356607" />
    </plugin>



Билд под андроид ВК
1) добавить в Grandle Scripts в build.grandle 2 свойства:
    cdvCompileSdkVersion=27
    cdvBuildToolsVersion="27.0.1"
2) поиском найти

I commented the lines below in the build.gradle file:
//debugCompile project(path: 'CordovaLib', configuration: 'debug') 
//releaseCompile project(path: 'CordovaLib', configuration: 'release')
and added:
compile project(':CordovaLib')

https://stackoverflow.com/questions/47023068/unable-to-run-ionic-app-after-update-to-android-studio-3-0/47257535

после этого проект собирается


Сертификат для вк
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
https://stackoverflow.com/questions/30070264/get-sha1-fingerprint-certificate-in-android-studio-for-google-maps

http://prntscr.com/jwokln





# Only install all plugins
ionic state restore --plugins
# or
cordova state restore --plugins

# Only remove all installed plugins
ionic state clear -- plugins

# Remove all then Install all plugins in package.json
ionic state reset -- plugins




chmod -R a+rwx

ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="142316016447382" --variable APP_NAME="com.coffeecup.app"

    <plugin name="cordova-plugin-facebook4" spec="^1.9.1">
        <variable name="APP_ID" value="142316016447382" />
        <variable name="APP_NAME" value="com.coffeecup.app" />
    </plugin>


Keychan error IOS 
http://prntscr.com/ijhy49



GOOGLE LOGIN
1) https://github.com/EddyVerbruggen/cordova-plugin-googleplus#4-installation-phonegap-cli--cordova-cli

Для иоса берем и устанавливаем
$ cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=myreversedclientid --variable WEB_APPLICATION_CLIENT_ID=mywebapplicationclientid

айдишники берем из GoogleService-Info.plist

2) Для андроида 

package.json

            "cordova-plugin-googleplus": {
                "REVERSED_CLIENT_ID": "242141053973-unp2dtn1tmroab90oev9c072eg03ae2v.apps.googleusercontent.com"
            },


config.xml - NO NEED CHANGES!! JUST FOR HISTORY!!

    <plugin name="cordova-plugin-googleplus" spec="^5.2.1">
        <variable name="REVERSED_CLIENT_ID" value="coffeecup-195612.apps.googleusercontent.com" />
    </plugin>


cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=242141053973-unp2dtn1tmroab90oev9c072eg03ae2v.apps.googleusercontent.com --variable WEB_APPLICATION_CLIENT_ID=242141053973-ttitqndd6bhlsieucppknpb0qvos28s2.apps.googleusercontent.com

////

  
