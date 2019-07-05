---
title: "WhydToGo : vos playlists Whyd à emporter partout"
date: 2015-08-28
summary: Envie d'exporter ses belles playlists en dehors de Whyd ? Introducing "WhydToGo".
tags: [Open-Source, Python, Musique, Whyd, Deezer, Heroku]
---

Whyd est une plateforme de partage musical, un mix entre un réseau social et un site de streaming comme YouTube ou SoundCloud.

Envie d'exporter ses belles playlists en dehors de la plateforme ? Introducing "WhydToGo".

Sur Whyd, on compile des playlists mêlant des tracks issues de plusieurs services de streaming. Ces playlists sont ensuite rassemblées sur un profil utilisateur, un peu à la manière d'un Facebook musical. Il suffit ensuite de "suivre" ses amis ou ses curateurs favoris pour disposer d'une timeline musicale communautaire ! Un must have, même pour un usage "bloc note". En ce moment, la startup parisienne travail sur un projet d'enceinte connectée. Retrouvez tous les détails sur leur nouvelle offensive juste [là](http://home.whyd.com/). En bonus, mon flux perso ou je consigne [toutes mes trouvailles musicales](https://whyd.com/djiit).

Avec la disparition prochaine de SoundClound (étouffé sous les problèmes de copyrights avec les grandes majors...), il devenait important de pouvoir récupérer toutes ces petites tracks avant qu'elles ne disparaissent de la toile (bien souvent, ces genres musicaux sont sous-représentés dans les services légaux de streaming/achats en ligne).

## Take your Whyd playlists away

WhydToGo, c'est donc un script Python codé avec les pieds en un soir (qui a subi plusieurs évolutions ensuite histoire de revenir sur des standards - PEP8 en tête) permettant de lister, puis, si demandé, de télécharger et de transcoder au format mp3 les tracks consignées dans les playlists Whyd d'un utilisateur. La première version utilisait [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/) pour "scraper" les pages web du site. Après un peu de reverse engineering sur l'API JS utilisé par la plateforme, la version actuelle est un peu plus élégante (et n'utilise plus de dépendances platform-dependant). L'interface en ligne de commande est gérée avec [Docopt](http://docopt.org/), une librairie fantastique pour faire des CLI en Python. Le code source est disponible sur GitHub à cette adresse : https://github.com/Djiit/whydtogo

Ca s'utilise tout simplement : `$ whydtogo user djiit` va télécharger toutes les tracks listées dans les playlists de mon profil. Mission accomplie.

## La version SaaS

Bon, c'est du Python, alors ça se transforme facilement en API RESTful (avec [Flask](http://flask.pocoo.org/) par exemple) ou en appli web, avec [Django](https://www.djangoproject.com/).
Histoire d'en être sûr, j'ai bootstrapé un Django rapidement sur Heroku (merci le tiers gratuit) juste ici : http://whydtogo.herokuapp.com/

Cette version ne télécharge aucun fichier. Elle se contente de lister les tracks présentes dans les playlists des utilisateurs (pour des raisons évidentes mais aussi moins évidentes comme l'espace disque requis pour stocker en tampon des centaines de tracks). C'était aussi l'occasion d'ajouter plusieurs fonctionnalités comme l'export d'une playlist vers Deezer (qui met à disposition une API toute faite pour ça!). C'est d'ailleurs Anthony Hymes [@TonyHymes](https://twitter.com/TonyHymes), le CM / Digital Marketing Manager de Whyd qui m'a soufflé l'idée lors d'une rencontre sur Paris.

Bref, un PaaS comme Heroku permet de mettre en ligne sans effort une application web – vraiment sans effort.

## La suite

Le projet évolue de temps à autre (surtout lorsque l'API ou le site de Whyd introduit des breaking changes). N'hésitez pas à ouvrir une issue sur GitHub si vous avez un problème ou une question.

J'utilise autour de whydtogo quelques services très utiles pour faciliter mon workflow de développement (intégration continue, déploiement et distribution continus, etc...). Certains sont gratuits, d'autres disposent d'un tiers gratuit très complet. L'idée est bien sûr de tendre vers un workflow d'intégration et de distribution autonome et intelligent (oui, j'aime quand la machine travaille à ma place). Mais ceci est une autre histoire ;)
