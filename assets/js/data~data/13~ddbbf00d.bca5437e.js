(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{243:function(e){e.exports={data:{tag:{title:"Heroku",belongsTo:{edges:[{node:{title:"WhydToGo : vos playlists Whyd à emporter partout",path:"/blog/whyd-to-go-vos-playlists-whyd-a-emporter-partout",date:"28. August 2015",timeToRead:3,description:'Envie d\'exporter ses belles playlists en dehors de Whyd ? Introducing "WhydToGo".',coverImage:null,content:'<p>Whyd est une plateforme de partage musical, un mix entre un réseau social et un site de streaming comme YouTube ou SoundCloud.</p>\n<p>Envie d\'exporter ses belles playlists en dehors de la plateforme ? Introducing "WhydToGo".</p>\n<p>Sur Whyd, on compile des playlists mêlant des tracks issues de plusieurs services de streaming. Ces playlists sont ensuite rassemblées sur un profil utilisateur, un peu à la manière d\'un Facebook musical. Il suffit ensuite de "suivre" ses amis ou ses curateurs favoris pour disposer d\'une timeline musicale communautaire ! Un must have, même pour un usage "bloc note". En ce moment, la startup parisienne travail sur un projet d\'enceinte connectée. Retrouvez tous les détails sur leur nouvelle offensive juste <a href="http://home.whyd.com/" target="_blank" rel="nofollow noopener noreferrer">là</a>. En bonus, mon flux perso ou je consigne <a href="https://whyd.com/djiit" target="_blank" rel="nofollow noopener noreferrer">toutes mes trouvailles musicales</a>.</p>\n<p>Avec la disparition prochaine de SoundClound (étouffé sous les problèmes de copyrights avec les grandes majors...), il devenait important de pouvoir récupérer toutes ces petites tracks avant qu\'elles ne disparaissent de la toile (bien souvent, ces genres musicaux sont sous-représentés dans les services légaux de streaming/achats en ligne).</p>\n<h2 id="take-your-whyd-playlists-away"><a href="#take-your-whyd-playlists-away" aria-hidden="true"><span class="icon icon-link"></span></a>Take your Whyd playlists away</h2>\n<p>WhydToGo, c\'est donc un script Python codé avec les pieds en un soir (qui a subi plusieurs évolutions ensuite histoire de revenir sur des standards - PEP8 en tête) permettant de lister, puis, si demandé, de télécharger et de transcoder au format mp3 les tracks consignées dans les playlists Whyd d\'un utilisateur. La première version utilisait <a href="http://www.crummy.com/software/BeautifulSoup/" target="_blank" rel="nofollow noopener noreferrer">BeautifulSoup</a> pour "scraper" les pages web du site. Après un peu de reverse engineering sur l\'API JS utilisé par la plateforme, la version actuelle est un peu plus élégante (et n\'utilise plus de dépendances platform-dependant). L\'interface en ligne de commande est gérée avec <a href="http://docopt.org/" target="_blank" rel="nofollow noopener noreferrer">Docopt</a>, une librairie fantastique pour faire des CLI en Python. Le code source est disponible sur GitHub à cette adresse : <a href="https://github.com/Djiit/whydtogo" target="_blank" rel="nofollow noopener noreferrer">https://github.com/Djiit/whydtogo</a></p>\n<p>Ca s\'utilise tout simplement : <code class="language-text">$ whydtogo user djiit</code> va télécharger toutes les tracks listées dans les playlists de mon profil. Mission accomplie.</p>\n<h2 id="la-version-saas"><a href="#la-version-saas" aria-hidden="true"><span class="icon icon-link"></span></a>La version SaaS</h2>\n<p>Bon, c\'est du Python, alors ça se transforme facilement en API RESTful (avec <a href="http://flask.pocoo.org/" target="_blank" rel="nofollow noopener noreferrer">Flask</a> par exemple) ou en appli web, avec <a href="https://www.djangoproject.com/" target="_blank" rel="nofollow noopener noreferrer">Django</a>.\nHistoire d\'en être sûr, j\'ai bootstrapé un Django rapidement sur Heroku (merci le tiers gratuit) juste ici : <a href="http://whydtogo.herokuapp.com/" target="_blank" rel="nofollow noopener noreferrer">http://whydtogo.herokuapp.com/</a></p>\n<p>Cette version ne télécharge aucun fichier. Elle se contente de lister les tracks présentes dans les playlists des utilisateurs (pour des raisons évidentes mais aussi moins évidentes comme l\'espace disque requis pour stocker en tampon des centaines de tracks). C\'était aussi l\'occasion d\'ajouter plusieurs fonctionnalités comme l\'export d\'une playlist vers Deezer (qui met à disposition une API toute faite pour ça!). C\'est d\'ailleurs Anthony Hymes <a href="https://twitter.com/TonyHymes" target="_blank" rel="nofollow noopener noreferrer">@TonyHymes</a>, le CM / Digital Marketing Manager de Whyd qui m\'a soufflé l\'idée lors d\'une rencontre sur Paris.</p>\n<p>Bref, un PaaS comme Heroku permet de mettre en ligne sans effort une application web – vraiment sans effort.</p>\n<h2 id="la-suite"><a href="#la-suite" aria-hidden="true"><span class="icon icon-link"></span></a>La suite</h2>\n<p>Le projet évolue de temps à autre (surtout lorsque l\'API ou le site de Whyd introduit des breaking changes). N\'hésitez pas à ouvrir une issue sur GitHub si vous avez un problème ou une question.</p>\n<p>J\'utilise autour de whydtogo quelques services très utiles pour faciliter mon workflow de développement (intégration continue, déploiement et distribution continus, etc...). Certains sont gratuits, d\'autres disposent d\'un tiers gratuit très complet. L\'idée est bien sûr de tendre vers un workflow d\'intégration et de distribution autonome et intelligent (oui, j\'aime quand la machine travaille à ma place). Mais ceci est une autre histoire ;)</p>\n'}}]}}}}}}]);