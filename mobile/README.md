Androdi build prod release device
http://mehedi.info/2017/01/22/how-to-solve-sign-the-build-using-keystore-or-buildconfig-or-sign-and-deploy-the-unsigned-apk-manually-using-android-tools/


cordova run android --prod --release -- --keystore=coffeecup.keystore --storePassword=8344477 --alias=coffeecup --password=8344477




ionic build --prod --release
cordova build ios --prod --release



{
  "project_info": {
    "project_number": "371598804642",
    "project_id": "coffecup-1509806508479"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:371598804642:android:5c6a7340f26ef1d7",
        "android_client_info": {
          "package_name": "com.coffeecup.app"
        }
      },
      "oauth_client": [
        {
          "client_id": "371598804642-is9luiuut0tismuk6khj0f3a42vst7hn.apps.googleusercontent.com",
          "client_type": 1,
          "android_info": {
            "package_name": "com.coffeecup.app",
            "certificate_hash": "8a414fc03543524e0f68805fbd8524d90350f038"
          }
        },
        {
          "client_id": "371598804642-fuvj52p8btb404lqroem9ioh62b8tkvt.apps.googleusercontent.com",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "AIzaSyC0MWx0T0sG_rGA2XLL3sLH6BnhPQdVmYg"
        }
      ],
      "services": {
        "analytics_service": {
          "status": 1
        },
        "appinvite_service": {
          "status": 1,
          "other_platform_oauth_client": []
        },
        "ads_service": {
          "status": 1
        }
      }
    }
  ],
  "configuration_version": "1"
}