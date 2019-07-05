---
title: Compiler ses applications Android avec Cordova en mode headless
date: 2015-07-16
summary: Retour d'expérience sur l'installation du SDK Android sur une Debian 64bits fraîchement installée.
tags: [Intégration Continue, Android, SDK, Cordova, Jenkins, headless]
---

On trouve ça et là des tutoriaux pour installer le SDK Android et compiler ses applications avec Cordova.

La plupart se contentent d’enchaîner les captures d'écrans en mode cliquodrome... Lorsqu'il s'agit d'équiper une machine sans interface graphique, idéalement pour en faire une machine de build, c'est tout de suite plus obscur. Vous êtes derrière un proxy ? Accrochez-vous.
Retour d'expérience sur l'installation du SDK Android sur une Debian 64bits fraîchement installée.

## Rapatrier les dépendances

Installer `wget` (si besoin), `java7` et `zipalign` qui nous servira à signer nos APK.

```bash
apt-get install wget zipalign openjdk-7-jdk ant
```

Sur une distribution 64bits récente, il vous faudra installer les dépendances suivantes :

Pour Ubuntu :

```bash
apt-get install libc6-i386 libglib2.0-0:i386 libsm6:i386 libglu1-mesa:i386 libgl1-mesa-glx:i386 libxext6:i386 libxrender1:i386 libx11-6:i386 libfontconfig1:i386 lsb-core
```

Pour Debian (testé sur Wheezy) :

```bash
dpkg --add-architecture i386
apt-get update
apt-get install libncurses5:i386 libstdc++6:i386 zlib1g:i386
```

## Android SDK Tool

Sortez un terminal et récupérez la dernière version du SDK Tool (voir https://developer.android.com/sdk/index.html#Other) :

```bash
cd /tmp
wget http://dl.google.com/android/android-sdk_r24.3.3-linux.tgz
tar -xzf android-sdk_r24.3.3-linux.tgz
rm android-sdk_r24.3.3-linux.tgz
mv android-sdk-linux /opt/
```

On a au passage extrait tout le dossier dans `/opt` histoire d'y accéder facilement plus tard.

(Optionnel) Indiquer un proxy HTTP dans le fichier `~/.android/androidtool.cfg` (pensez à remplacer les variables par de vraies valeurs) :

```bash
echo "sdkman.force.http=true
http.proxyHost=<proxy_host>
http.proxyPort=<proxy_port>" > ~/.android/androidtool.cfg
```

Une fois android-sdk-tools installé, rendez-le accessible dans votre PATH:

```bash
export ANDROID_HOME=/opt/android-sdk-linux
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

On récupère les dernières versions du SDK :

```bash
android update sdk --no-ui
```

(Optionnel) Installer une version des build-tools particulière :

```bash
android update sdk --all --filter "build-tools-22.0.1" --no-ui
```

That's it ! La machine est prête à enchaîner les builds. Essayez donc de créer un projet :

```bash
android create project \
--target 1 \
--name MyAndroidApp \
--path ./MyAndroidAppProject \
--activity MyAndroidAppActivity \
--package com.example.myandroidapp
```

On peut facilement ranger tout ça dans un script d'installation à soumettre à SaltSack ou Puppet. Reste à déclarer la machine, par exemple, en tant que slave Jenkins dédié à des jobs de compilation Android.

## Cordova

Assurez-vous d'avoir la dernière version de NodeJS / NPM avant de passer à l'installation de Cordova (https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories). C'est parti :

```bash
npm install -g cordova
```

Note : Cordova utilise Gradle pour build les projets; le coup du proxy peut-être assez casse-tête.

(Optionnel) Indiquer un proxy HTTP et HTTPS dans le fichier `~/.gradle/gradle.properties` (pensez à remplacer les variables par de vraies valeurs) :

    echo " systemProp.http.proxyHost=<proxy_host>
    systemProp.http.proxyPort=<proxy_port>
    systemProp.http.proxyUser=<proxy_user>
    systemProp.http.proxyPassword=<proxy_password>
    systemProp.https.proxyHost=<proxy_host>
    systemProp.https.proxyPort=<proxy_port>
    systemProp.https.proxyUser=<proxy_user>
    systemProp.https.proxyPassword=<proxy_password> " > ~/.gradle/gradle.properties

Placez-vous dans votre dossier de projet Cordova (ou créez-en un avec `cordova create MonProjet`). Le petit bout de code suivant assure le build complet d'un APK signé. Il utilise 3 variables d'environnement pour récupérer l'emplacement de votre keystore (`ANDROID_KEYSTORE`), le mot de passe associé (`ANDROID_STORE_PASS`) et la keypass spécifique à votre application (`ANDROID_KEY_PASS`). L’avantage direct de ces variables est de ne pas avoir à stocker dans le projet (et donc souvent dans un dépôt de versionning) des informations sensibles comme les passwords ou encore le fichier `.keystore`. En plus, rien de plus facile pour Jenkins ou un autre outil d'intégration continue de passer ces variables avant le lancement d'un job de compilation.

```bash
cordova platforms add android
cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $(ANDROID_KEYSTORE) -storepass $(ANDROID_STORE_PASS) platforms/android/build/outputs/apk/android-release-unsigned.apk BatStat -keypass $(ANDROID_KEY_PASS)
zipalign -f -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/android-release-signed.apk
```

Vous pouvez à loisir mettre ça dans une target `android` d'un fichier `Makefile` et lancer un joli `make android` pour compiler vos applis ! Joie !

N'hésitez pas à laisser vos commentaires juste là-dessous.

## Quelques liens

- https://developer.android.com/sdk/index.html
- https://developer.android.com/tools/projects/projects-cmdline.html
- http://doc.ubuntu-fr.org/android_sdk
- https://cordova.apache.org/
