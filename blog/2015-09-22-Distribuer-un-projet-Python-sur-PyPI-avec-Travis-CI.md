---
title: Distribuer un projet Python sur PyPI avec Travis-CI
date: 2015-09-22
summary: Vous avez toujours rêvé de distribuer votre lib Python sur PyPI sans jamais oser le faire ?
tags: [Python, Travis-CI, PyPI, Intégration Continue, Automation]
---

Vous avez toujours rêvé de distribuer votre lib Python sur PyPI sans jamais oser le faire ?

[Travis-CI](https://travis-ci.org/), un service bien connu de la communauté open-source, assure l'intégration continue (les tests, le build) de vos projets hébergés sur GitHub. Vous vous en doutez, il est aussi capable de pousser votre lib sur PyPI. Retour d'expérience.

## Fordisme 2.0

Le monde est bien fait, je souhaitais brancher un minuscule projet perso avec Travis. Pour ça, rien de plus simple. Rendez-vous sur travis-ci.org et connectez-vous avec votre compte GitHub.

Depuis la barre latérale de gauche, selectionnez le "+" et laissez vous guider par l'interface.

![Ajout d'un dépôt](./images/travis_add_repo.png)

On est plutôt bien accueilli par ce bandeau sympa qui nous résume les étapes de configuration.

![Trois étapes simples](./images/travis_steps.png)

Un clic suffit pour dire à Travis de surveiller notre dépôt; le service récupère automatiquement la liste des dépots de notre compte GitHub.

![Activation du dépot](./images/travis_deploy.png)

Revenons un instant au code. On va ajouter un fichier `.travis.yml` à la racine de notre dépot avec quelques infos dedans :

```yaml
language: python

python:
  - "3.4"
  - "3.5"
  - "nightly" # currently points to 3.6-dev

# command to install dependencies
install: "pip install -e ."

# command to run tests
script: py.test
```

On commit/push et... Magie ! Travis se lance dans les tests avec [py.test](http://pytest.org/latest/) (arme de choix pour les tests en Python !), sur les versions de Python qu'on a renseigné dans le précédent fichier.

![Le job est en attente](./images/travis_job_queued.png)

Une fois les tests joués, on a un retour clair sur les résultats des tests, un badge pour notre README en bonus et tout ça sans lever le petit doigt.

![Le job est terminé](./images/travis_job_done.png)

## Une petite envie de PyPI

Coup de chance, Travis permet de déployer out-of-the-box vers une flopée de services.

![Services intégrés à Travis](./images/travis_deploy.png)

Dans notre `.travis.yml` donc, on va ajouter ce petit bloc pour que Travis déploie notre projet sur PYPI - et uniquement les tags pour éviter de polluer le registre Python :

```yaml
deploy:
  provider: pypi
  user: $PYPI_USER
  password: $PYPI_PASS
  skip_cleanup: true
  on:
    tags: true
    branch: master
    python: "3.5"
```

Remarquez qu'on utilise ici deux variables d'environnement définies dans l'interface de Travis; dont l'une est encryptée pour des raisons évidentes :). Le `skip_cleanup` a toute son importance car c'est grâce à lui qu'on va pouvoir pousser notre package vers PyPI. Enfin, les conditions listés dans `on:` s'assure que seul les tags sur la branche master construit avec python35 seront publiés sur PyPI.

![Variables d'environnement](./images/travis_env_variables.png)

Hop, commit/push et Travis s'occupe du reste ! Le projet est dispo en quelques instants sur https://pypi.python.org/pypi/vvvv[PyPI] :

## Le mot de la fin

On peut faire travailler un paquet de services pour nous autour de nos dépots pour automatiser pleins d'actions d'intégration différentes. On peut même demander au Hub Docker de construire une image tout seul... Mais ceci est une autre histiore.

En bonus, pensez à ajouter un beau badge au `README.md` de votre projet pour montrer à tout le monde que votre code est distribué sur PYPI en faisant un tour sur [Shields.io](http://shields.io/).

```
[![PyPI](https://img.shields.io/pypi/v/vvvv.svg)](https://pypi.python.org/pypi/vvvv)
```

Quelques liens plus complet :

- http://docs.travis-ci.com/user/languages/python/
- http://docs.travis-ci.com/user/deployment/pypi/
- https://github.com/Djiit/vvvv/ (le projet cobaye)

A bientôt !
