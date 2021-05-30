Tester :   https://textadventure.nicolaslouin.fr



## Affichage

Interface prévue pour un petit écran.

Pour un affichage correct :
	faire f12
	dans Chrome, cliquer sur 'Toggle device toolbar'  (deuxième icône en haut à gauche)
	dans Firefox, cliquer sur 'Vue adaptative' (icône en haut à droite)
	réduire la taille de la fenêtre (optimal pour 500px de large)

Attention : si navigateur rafraichi sur une autre page que la racine, provoque une erreur 404.

Dans un navigateur en production : le bouton 'Charger' reste parfois incliquable, même si une partie à été sauvegardée (pas ce problème quand c'est une application mobile)



## Fonctionnalités

### Entités

Le scénario est construit à partir d'entités.

Chaque entité est d'un certain type : lieu, personnage, passage, objet, effet, sujet

Une entité peut être prévu pour une instance unique (pour un lieu, un personnage, ...), mais peut aussi être instancié plusieurs fois (par exemple pour des objets génériques).

L'état de chaque entité est enregistré quand on sauvegarde une partie.

Le joueur est lui aussi une entité qui se déplace de lieu en lieu.



Chaque entité peut contenir :

- une série d'images servant d'illustration (utilisés comme calques superposés dans un canvas)
- une image d'aperçu
- une ambiance sonore
- une description complète
- une description d'aperçu
- des connexions (pour les lieux)
- d'autres entités (les personnage, objets à l'intérieur)
- des actions (type 'prendre', 'parler', ...)
- des choix

Chacun de ces paramètres peut changer au cour du jeu.



### Actions

Chaque type d'entité a des actions qui lui sont attribuées (sous forme de boutons), utilisables dans certaines conditions (exemple : un personnage doit être vivant pour qu'on puisse lui parler).

Chaque entité peut réagir à sa manière à une action (supplantant le comportement par défaut).

Une action réussie fait augmenter le temps.



### Temps

Quand le temps augmente chaque entité peut être mise à jour.



### Choix

À chaque entités peuvent être associés un certain nombre de choix (sous forme de boutons)

(à la différence des actions, pas dépendant d'une type ni de comportement par défaut)



### Connexions

À chaque lieu peuvent être associés des connexions conduisant à d'autres lieux.

Une connexion peut être obstruée par un passage (représentant par exemple un pont, une porte). 

Un passage peut lui-même contenir d'autres entités (exemple : un personnage gardant un pont).

Un même passage peut être associé à des connexions de différents lieux (exemple : une porte se trouvant entre deux pièces).



#### Messages

Les évènements arrivant au cours du jeu sont rapportés via des messages, affichés dans une nouvelle fenêtre.

À chaque message peuvent être associés un certain nombre de choix.



### Conversation

Chaque entité peut servir de sujet de conversation.

On peut interroger un personnage sur les sujets de conversation qui lui sont connus et pour lesquels il a quelque chose à dire, à condition qu'ils soient aussi connus du joueur.



## À ajouter

- gérer plusieurs sauvegardes
- se déplacer/zoomer dans une illustration (utile pour une carte par exemple)
- observer un autre lieu à partir d'une connexion
- un mode d'affichage alternatif (présenter les lieux visités et les messages les uns en dessous des autres, comme un flux)
- charger tous les images et audios au chargement d'une partie



## Bugs

Rien à signaler pour le moment.
