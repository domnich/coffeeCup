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