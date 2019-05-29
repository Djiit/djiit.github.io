(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{252:function(e){e.exports={data:{tag:{title:"SDK",belongsTo:{edges:[{node:{title:"Compiler ses applications Android avec Cordova en mode headless",path:"/blog/compiler-ses-applications-android-avec-cordova-en-mode-headless",date:"16. July 2015",timeToRead:4,description:"Retour d'expérience sur l'installation du SDK Android sur une Debian 64bits fraîchement installée.",coverImage:null,content:'<p>On trouve ça et là des tutoriaux pour installer le SDK Android et compiler ses applications avec Cordova.</p>\n<p>La plupart se contentent d’enchaîner les captures d\'écrans en mode cliquodrome... Lorsqu\'il s\'agit d\'équiper une machine sans interface graphique, idéalement pour en faire une machine de build, c\'est tout de suite plus obscur. Vous êtes derrière un proxy ? Accrochez-vous.\nRetour d\'expérience sur l\'installation du SDK Android sur une Debian 64bits fraîchement installée.</p>\n<h2 id="rapatrier-les-dépendances"><a href="#rapatrier-les-d%C3%A9pendances" aria-hidden="true"><span class="icon icon-link"></span></a>Rapatrier les dépendances</h2>\n<p>Installer <code class="language-text">wget</code> (si besoin), <code class="language-text">java7</code> et <code class="language-text">zipalign</code> qui nous servira à signer nos APK.</p>\n<pre class="language-bash"><span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">wget</span> zipalign openjdk-7-jdk ant</pre>\n<p>Sur une distribution 64bits récente, il vous faudra installer les dépendances suivantes :</p>\n<p>Pour Ubuntu :</p>\n<pre class="language-bash"><span class="token function">apt-get</span> <span class="token function">install</span> libc6-i386 libglib2.0-0:i386 libsm6:i386 libglu1-mesa:i386 libgl1-mesa-glx:i386 libxext6:i386 libxrender1:i386 libx11-6:i386 libfontconfig1:i386 lsb-core</pre>\n<p>Pour Debian (testé sur Wheezy) :</p>\n<pre class="language-bash">dpkg --add-architecture i386\n<span class="token function">apt-get</span> update\n<span class="token function">apt-get</span> <span class="token function">install</span> libncurses5:i386 libstdc++6:i386 zlib1g:i386</pre>\n<h2 id="android-sdk-tool"><a href="#android-sdk-tool" aria-hidden="true"><span class="icon icon-link"></span></a>Android SDK Tool</h2>\n<p>Sortez un terminal et récupérez la dernière version du SDK Tool (voir <a href="https://developer.android.com/sdk/index.html#Other" target="_blank" rel="nofollow noopener noreferrer">https://developer.android.com/sdk/index.html#Other</a>) :</p>\n<pre class="language-bash"><span class="token function">cd</span> /tmp\n<span class="token function">wget</span> http://dl.google.com/android/android-sdk_r24.3.3-linux.tgz\n<span class="token function">tar</span> -xzf android-sdk_r24.3.3-linux.tgz\n<span class="token function">rm</span> android-sdk_r24.3.3-linux.tgz\n<span class="token function">mv</span> android-sdk-linux /opt/</pre>\n<p>On a au passage extrait tout le dossier dans <code class="language-text">/opt</code> histoire d\'y accéder facilement plus tard.</p>\n<p>(Optionnel) Indiquer un proxy HTTP dans le fichier <code class="language-text">~/.android/androidtool.cfg</code> (pensez à remplacer les variables par de vraies valeurs) :</p>\n<pre class="language-bash"><span class="token keyword">echo</span> <span class="token string">"sdkman.force.http=true\nhttp.proxyHost=&lt;proxy_host>\nhttp.proxyPort=&lt;proxy_port>"</span> <span class="token operator">></span> ~/.android/androidtool.cfg</pre>\n<p>Une fois android-sdk-tools installé, rendez-le accessible dans votre PATH:</p>\n<pre class="language-bash"><span class="token function">export</span> ANDROID_HOME<span class="token operator">=</span>/opt/android-sdk-linux\n<span class="token function">export</span> PATH<span class="token operator">=</span><span class="token variable">${PATH}</span><span class="token keyword">:</span><span class="token variable">$ANDROID_HOME</span>/tools:<span class="token variable">$ANDROID_HOME</span>/platform-tools</pre>\n<p>On récupère les dernières versions du SDK :</p>\n<pre class="language-bash">android update sdk --no-ui</pre>\n<p>(Optionnel) Installer une version des build-tools particulière :</p>\n<pre class="language-bash">android update sdk --all --filter <span class="token string">"build-tools-22.0.1"</span> --no-ui</pre>\n<p>That\'s it ! La machine est prête à enchaîner les builds. Essayez donc de créer un projet :</p>\n<pre class="language-bash">android create project \\\n--target 1 \\\n--name MyAndroidApp \\\n--path ./MyAndroidAppProject \\\n--activity MyAndroidAppActivity \\\n--package com.example.myandroidapp</pre>\n<p>On peut facilement ranger tout ça dans un script d\'installation à soumettre à SaltSack ou Puppet. Reste à déclarer la machine, par exemple, en tant que slave Jenkins dédié à des jobs de compilation Android.</p>\n<h2 id="cordova"><a href="#cordova" aria-hidden="true"><span class="icon icon-link"></span></a>Cordova</h2>\n<p>Assurez-vous d\'avoir la dernière version de NodeJS / NPM avant de passer à l\'installation de Cordova (<a href="https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories" target="_blank" rel="nofollow noopener noreferrer">https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories</a>). C\'est parti :</p>\n<pre class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> -g cordova</pre>\n<p>Note : Cordova utilise Gradle pour build les projets; le coup du proxy peut-être assez casse-tête.</p>\n<p>(Optionnel) Indiquer un proxy HTTP et HTTPS dans le fichier <code class="language-text">~/.gradle/gradle.properties</code> (pensez à remplacer les variables par de vraies valeurs) :</p>\n<pre class="language-text">echo &quot; systemProp.http.proxyHost=&lt;proxy_host&gt;\nsystemProp.http.proxyPort=&lt;proxy_port&gt;\nsystemProp.http.proxyUser=&lt;proxy_user&gt;\nsystemProp.http.proxyPassword=&lt;proxy_password&gt;\nsystemProp.https.proxyHost=&lt;proxy_host&gt;\nsystemProp.https.proxyPort=&lt;proxy_port&gt;\nsystemProp.https.proxyUser=&lt;proxy_user&gt;\nsystemProp.https.proxyPassword=&lt;proxy_password&gt; &quot; &gt; ~/.gradle/gradle.properties</pre>\n<p>Placez-vous dans votre dossier de projet Cordova (ou créez-en un avec <code class="language-text">cordova create MonProjet</code>). Le petit bout de code suivant assure le build complet d\'un APK signé. Il utilise 3 variables d\'environnement pour récupérer l\'emplacement de votre keystore (<code class="language-text">ANDROID_KEYSTORE</code>), le mot de passe associé (<code class="language-text">ANDROID_STORE_PASS</code>) et la keypass spécifique à votre application (<code class="language-text">ANDROID_KEY_PASS</code>). L’avantage direct de ces variables est de ne pas avoir à stocker dans le projet (et donc souvent dans un dépôt de versionning) des informations sensibles comme les passwords ou encore le fichier <code class="language-text">.keystore</code>. En plus, rien de plus facile pour Jenkins ou un autre outil d\'intégration continue de passer ces variables avant le lancement d\'un job de compilation.</p>\n<pre class="language-bash">cordova platforms add android\ncordova build android --release\njarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <span class="token variable"><span class="token variable">$(</span>ANDROID_KEYSTORE<span class="token variable">)</span></span> -storepass <span class="token variable"><span class="token variable">$(</span>ANDROID_STORE_PASS<span class="token variable">)</span></span> platforms/android/build/outputs/apk/android-release-unsigned.apk BatStat -keypass <span class="token variable"><span class="token variable">$(</span>ANDROID_KEY_PASS<span class="token variable">)</span></span>\nzipalign -f -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/android-release-signed.apk</pre>\n<p>Vous pouvez à loisir mettre ça dans une target <code class="language-text">android</code> d\'un fichier <code class="language-text">Makefile</code> et lancer un joli <code class="language-text">make android</code> pour compiler vos applis ! Joie !</p>\n<p>N\'hésitez pas à laisser vos commentaires juste là-dessous.</p>\n<h2 id="quelques-liens"><a href="#quelques-liens" aria-hidden="true"><span class="icon icon-link"></span></a>Quelques liens</h2>\n<ul>\n<li><a href="https://developer.android.com/sdk/index.html" target="_blank" rel="nofollow noopener noreferrer">https://developer.android.com/sdk/index.html</a></li>\n<li><a href="https://developer.android.com/tools/projects/projects-cmdline.html" target="_blank" rel="nofollow noopener noreferrer">https://developer.android.com/tools/projects/projects-cmdline.html</a></li>\n<li><a href="http://doc.ubuntu-fr.org/android_sdk" target="_blank" rel="nofollow noopener noreferrer">http://doc.ubuntu-fr.org/android_sdk</a></li>\n<li><a href="https://cordova.apache.org/" target="_blank" rel="nofollow noopener noreferrer">https://cordova.apache.org/</a></li>\n</ul>\n'}}]}}}}}}]);