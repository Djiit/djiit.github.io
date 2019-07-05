---
title: Utiliser Docker derriere un proxy sur CoreOS
date: 2015-07-05
summary: Petit tips du jour qui pourra sauver l'après midi de certains...
tags: [Docker, CoreOS, proxy, DevOps]
---

Petit tips du jour qui pourra sauver l'après midi de certains...

## The Place beyond the Proxy

Certains utilisateurs de Docker sont bien cachés derrière un proxy d'entreprise ou autre méchanceté du genre. Docker permet d'utiliser notamment les variables d'environnement `http_proxy` et `https_proxy` (capacité directement hérité des librairies Go).

Sous CoreOS, on peut aussi renseigner une bonne fois pour toutes les informations de connexion au proxy dans un fichier de configuration et... ne plus y penser. Joie!

## Let's do this !

Commencons par créer ou éditer la configuration du _unit_ Docker de systemd :

\$ sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf

On y rentre les variables d'environnement qui nous intéressent

    [Service]
    Environment="HTTP_PROXY=http://[user]:[password]@[hostname]:[port]" "NO_PROXY=localhost,127.0.0.0/8,172.17.0.0/16,.sock"

Le ".sock" vous évitera quelques maux de cranes (le client Docker sera ainsi capable de contacter le démon via le socket Unix).

On demande à systemd de prendre en compte nos modificatrions sur l'Unit Docker :

    $ sudo systemctl daemon-reload

On redémarre ensuite le service Docker :

    $ sudo systemctl restart docker

That's it, un petit test rapide : `docker pull busybox` vous confirmera que Docker peut bien récupérer les images à travers votre proxy !
