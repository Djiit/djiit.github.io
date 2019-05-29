(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{232:function(e){e.exports={data:{post:{title:"Docker pour les développeurs: Environment as Code",path:"/blog/docker-pour-les-developpeurs-environment-as-code",date:"2. August 2015",timeToRead:4,tags:[{id:"Docker",title:"Docker",path:"/blog/tag/docker"},{id:"Docker-Compose",title:"Docker-Compose",path:"/blog/tag/docker-compose"},{id:"DevOps",title:"DevOps",path:"/blog/tag/dev-ops"},{id:"GiantSwarm",title:"GiantSwarm",path:"/blog/tag/giant-swarm"},{id:"Rancher",title:"Rancher",path:"/blog/tag/rancher"}],description:'Envie d\'exporter ses belles playlists en dehors de Whyd ? Introducing "WhydToGo".',content:'<p>Docker, ce game changer qu\'un certain Solomon Hykes venait (bien trop) rapidement presenter en pleine PyCon UK 2013 (<a href="https://www.youtube.com/watch?v=wW9CAH9nSLs" target="_blank" rel="nofollow noopener noreferrer">souvenirs</a>) change radicalement la vie des (dev)ops. Mais pour un dev\' tout court, quelle utilité ?\nSpoiler Alert : Docker (et Docker-Compose) va permettre de déclarer de manière simple et portable un ensemble de services tiers liés à notre application. Chaque dev peut alors mettre en route en quelques instants un environnement de développement <em>iso</em> à celui du reste de son équipe. Ou du reste du monde. Portabilité bonjour.</p>\n<h2 id="compose-toi-toi-même"><a href="#compose-toi-toi-m%C3%AAme" aria-hidden="true"><span class="icon icon-link"></span></a>Compose toi toi-même</h2>\n<p><a href="https://docs.docker.com/compose/" target="_blank" rel="nofollow noopener noreferrer">Docker-Compose</a>, anciennement Fig créé par <a href="https://www.orchardup.com/" target="_blank" rel="nofollow noopener noreferrer">Orchard</a> (racheté par Docker Inc. depuis) est un outil qui permet de facilement déclarer dans un fichier YaML les différents services qui lient notre applications. On y décrit comment les conteneurs qui accueillent les services dont notre application a besoin sont liés entre eux et doivent se comporter (ports à exposer, volumes à monter, etc...) comme on le ferait en ligne de commande avec le client <code class="language-text">docker</code>. Exemple ici pour un wiki simpliste :</p>\n<pre class="language-yaml"><span class="token key atrule">Mediawiki</span><span class="token punctuation">:</span>\n  <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"nickstenning/mediawiki:latest"</span>\n  <span class="token key atrule">links</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token string">"MySQL:mysql"</span>\n  <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token string">"8088:80"</span>\n  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token string">"/var/mediawiki:/data"</span>\n<span class="token key atrule">MySQL</span><span class="token punctuation">:</span>\n  <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"centurylink/mysql:5.5"</span>\n  <span class="token key atrule">ports</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token string">"3306:3306"</span>\n  <span class="token key atrule">expose</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token string">"3306"</span>\n  <span class="token key atrule">environment</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> MYSQL_ROOT_PASSWORD=MediaWiki.123</pre>\n<p>NOTE: Note: Cet exemple est honteusement pompé sur <a href="https://lorry.io/" target="_blank" rel="nofollow noopener noreferrer">Lorry.io</a> (voir lien en fin d\'article). En plus des services dont dépend notre projet, on peut déclarer des services de monitoring, un stack ELK portable, des services de mocks, etc... Ultra-pratique.</p>\n<p>On sort le CLI docker-compose (<code class="language-text">pip install docker-compose</code>) et on commence à orchestrer tout ce petit monde :</p>\n<pre class="language-bash">docker-compose start ./docker-compose.yml</pre>\n<p>Le fichier est alors passé au démon Docker qui va se charger de récupérer ou build les images selon les cas et démarrer les conteneurs demandés avec un nom parlant. Voilà, votre environnement de dev est prêt!</p>\n<h2 id="ce-nest-que-du-texte"><a href="#ce-nest-que-du-texte" aria-hidden="true"><span class="icon icon-link"></span></a>Ce n\'est que du texte</h2>\n<p>...Et le texte, ça se versionne très simplement ! Comme ce bon vieux <code class="language-text">requirements.txt</code> bien connus des Pythonistes qui permet déjà de récupérer les dépendances d\'un projet, on applique le même traitement à notre environnement. En ajoutant le fichier <code class="language-text">docker-compose.yml</code> à un dépôt de versionning git par exemple, on permet à n\'importe qui de rapidement cloner le dépôt et monter un environnement de développement. Plus besoin d\'installer tout un tas de paquets sur sa machine ni de monter une VM dédiée.</p>\n<p>En bonus, on peut joindre au dépôt un <code class="language-text">Dockerfile</code> et ajouter notre projet dans le <code class="language-text">docker-compose.yml</code> pour qu\'une instance soit lancée en même temps que le reste de l\'environnement : <em>Docker-ception</em>.</p>\n<h2 id="docker-est-development-ready"><a href="#docker-est-development-ready" aria-hidden="true"><span class="icon icon-link"></span></a>Docker est "Development-Ready"</h2>\n<p>Cela change radicalement des worklows de développement où l\'on passait un temps fou à trouver une machine propice au développement d\'un projet en particulier, où l\'on installait en dur sur sa machine un moteur de base de données, un serveur web, etc...</p>\n<p>Même avec l\'avènement de solutions comme Vagrant, on avait toujours besoin d\'avoir un moteur de machines virtuelles (VirtualBox, VMWare, etc...). Docker nous facilite grandement la vie et gère toute la complexité de partager un environnement de dev de bout en bout.</p>\n<p>En production, la donne est légèrement différente (car les problématiques ne sont pas les mêmes). Mais les solutions compatibles avec ce workflow de développement existent ! Tous les grands <em>cloud providers</em> proposent déjà un service de <em>hosting</em> de conteneurs; et chacun applique sa propre sauce d\'orchestration des services. <a href="https://giantswarm.io/" target="_blank" rel="nofollow noopener noreferrer">GiantSwarm</a>, un <em>cloud provider</em> proposant une offre de PaaS pensée pour gérer des conteneurs possède son propre vocabulaire de description des services : c\'est un dernier fichier YAML à joindre à son code et "pouf" votre application est déployée en poussant votre code - "Heroku-style", mais on parle ici de <em>tous</em> les composants (ou micro-services) de votre application, même les services tiers comme la BDD, etc...).</p>\n<p>NOTE: Note: GiantSwarm est actuellement en phase d\'early access. J\'ai la chance de pouvoir tester leurs services et je vous assure que le mot déploiement revêt un sens nouveau depuis que je teste leur plate-forme. Allez y faire un tour.</p>\n<p>Enfin, <a href="http://rancher.com/rancher-feature-iii/" target="_blank" rel="nofollow noopener noreferrer">Rancher</a>, un moteur de PaaS à installer soi-même comme un grand à choisi d\'utiliser la grammaire de docker-compose (on peut donc lui donner à manger un <code class="language-text">docker-compose.yml</code> et il se charger de monter nos services !) et de l\'étendre avec un <code class="language-text">rancher-compose.yml</code> qui permet de définir des règles d\'auto-scale, de load-balancing et plus encore.</p>\n<p>L’approche de Rancher, pendant que j’y suis, est assez originale : votre outil d\'orchestration est lui aussi rangé dans un conteneur. Il est multi-environnement, possède une bel interface web et l’équipe à l’origine du projet propose également <em>RancherOS</em>, un OS ou quasiment <em>tout</em> est conteneurisé. Je pourrais vous en parler des heures, mais vous êtes déjà parti vous monter un cluster <em>CoreOS</em> pour tester tout ça, je le sais bien.</p>\n<p>Et vous ? Docker en environnement de dev ? de prod ?!</p>\n<h2 id="quelques-liens"><a href="#quelques-liens" aria-hidden="true"><span class="icon icon-link"></span></a>Quelques liens</h2>\n<ul>\n<li>Docker-Compose: <a href="https://docs.docker.com/compose/" target="_blank" rel="nofollow noopener noreferrer">https://docs.docker.com/compose/</a></li>\n<li>Giant-Swarm : <a href="https://giantswarm.io/" target="_blank" rel="nofollow noopener noreferrer">https://giantswarm.io/</a></li>\n<li>Rancher / Rancher OS : <a href="http://rancher.com/" target="_blank" rel="nofollow noopener noreferrer">http://rancher.com/</a></li>\n<li>Lorry.io : <a href="https://lorry.io/" target="_blank" rel="nofollow noopener noreferrer">https://lorry.io/</a></li>\n</ul>\n',coverImage:null}}}}}]);