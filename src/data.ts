import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'le-petit-prince',
    title: 'LE CHEMIN DE LA REUSITE',
    author: 'Alain Foaleng',
    genre: 'Roman Philosophique',
    description: `La ville de Yaoundé s’éveillait lentement sous les premiers rayons du soleil. Dans le quartier
                  Nkaobang, les rues de terre rouge retrouvaient leur agitation habituelle. Les mototaxis traversaient
                  les ruelles à toute vitesse, les commerçantes installaient leurs étals, tandis que les enfants, cartable
                  au dos, se dirigeaient vers leurs écoles.`,
    coverColor: 'from-blue-950 via-slate-900 to-indigo-950',
    coverDesignType: 'artistic',
    createdAt: '2026-01-15T08:00:00Z',
    tags: ['Classique', 'Philosophie', 'Poésie', 'Jeunesse'],
    pagesCount: 12,
    chapters: [
      {
        id: 'lpp-ch1',
        title: 'Chapitre I : Un enfant de Nkoabang',
        content: `La ville de Yaoundé s’éveillait lentement sous les premiers rayons du soleil. Dans le quartier
Nkaobang, les rues de terre rouge retrouvaient leur agitation habituelle. Les mototaxis traversaient
les ruelles à toute vitesse, les commerçantes installaient leurs étals, tandis que les enfants, cartable
au dos, se dirigeaient vers leurs écoles.

Au milieu de cette foule vivait un adolescent nommé Damien. Agé de douze ans, il habitait avec ces
parents et ses deux jeunes frères dans une petite maison construite en planches et recouvert de
tôles rouillés. Pendant la saison des pluies, l’eau s’infiltrait par le toit. La nuit, toute la famille plaçait
des bassines dans différentes pièces pour recueillir les gouttes qui tombaient au plafond.

Son père, autrefois ouvrier sur des chantiers, ne trouvait plus des emplois occasionnels. Sa mère
gagnait difficilement sa vie en vendant quelques légumes, des arachides grillées et des beignets. Les
revenus de la famille ne suffisaient presque jamais à couvrir les dépenses essentielles.

Malgré cette pauvreté, Damien nourrissait un rêve immense. Il voulait réussir, non pour devenir
célèbre, mais pour offrir une vie meilleure a ceux qu’il aimait. Il répétait sauvent en silence :

« Un jour, mes parents ne manqueront plus de rien.
Chaque matin, il parcourait plusieurs kilomètres à pied pour rejoindre son collège. Ses chaussures
étaient usées, son uniforme avait été recousu à plusieurs reprises, mais il gardait toujours la tête
haute.

A la fin des cours, pendant que ses camarades rentraient joue au football, Damien se rendait au
marché de Nkoabang. Là, il aidait les commerçantes à transporter les sacs de riz, des cartons d’huile
ou des régimes de plantains et bananes. En échange, il recevait quelques centaines de francs CFA
Les jours ou le travail manquait, il ramassait des bouteilles en plastiques et de vieux morceaux de
ferrailles qu’il revendait à des recycleurs.

 Chaque pièce gagnée était précieusement conservée dans
une petites boite métallique cachée sous son lit. Cet argent servait à acheter des cahiers, des stylos
et parfois à payer une partie de ses frais de scolarité.

Un soir, alors qu’il rentrait chez lui, épuisé, il aperçut sa mère assise devant la maison. Elle essuyait
discrètement une larme.

- Maman qu’est qui ne va pas ?
  Demanda Damien.
  Elle tenta de sourire.

- Ce n’est rien, mon fils. Je me demande seulement comment nous allons payer le loyer ce mois-ci.


Ces mots restèrent gravés dans son cœur.

Cette nuit-là, Damien ne dormit presque pas. Il regardait les étoiles à travers les ouvertures
du toit et pris une décision qui allait changer toute son existence.

Il se promit de ne jamais abandonner ses études, quelles que soient les difficultés. Il
travaillerait davantage, apprendrait sans relâche et construirait son avenir pierre après
pierre.


`,
        durationMin: 5
      },
      {
        id: 'lpp-ch2',
        title: 'Chapitre II : Les blessures de la pauvreté',
        content: `Le lendemain de sa promesse, Damien se réveilla avant l’aube. Un léger vent soufflait à travers les
fissures des murs de la maison familiales. Il enfila son uniforme soigneusement lavé à la veille par sa
mère et prit la route de l’école.

Son ventre était vide. A la maison, il ne restait qu’un peu de farine de maïs pour préparer le repas du
soir. Malgré la faim qui le tenaillait, il gardait le sourire. Au collège, les cours se succédèrent Damien
était un élève brillant. Les mathématiques, l’histoire, sciences le passionnaient. Ses enseignants
admiraient son sérieux, mais ignoraient les sacrifices qu’il consentait chaque jour pour rester sur les
bancs de l’école.

A la récréation, plusieurs élèves achetèrent des sandwichs et des boissons. Damien s’assit
discrètement sous un manguier avec des cahier entre les mains.

- Pourquoi tu ne manges jamais ?

Demanda son camarade Boris.

Damien sourit.

- Je n’ai pas très faim.

Il préféra cacher la vérité plutôt que d’avouer qu’il n’avait pas un seul franc dans ces poches.

Quelque semaine plus tard, un événement bouleversa sa vie. Le directeur annonça que tous les
élèves devaient payer la deuxième tranche des frais de scolarité avant la fin du mois. En rentrant à la
maison, Damien trouva ses parents plongés dans un profond silence.

- Papa… il faut payer les frais de scolarité.

Son père baissa les yeux.

- Mon fils…J’ai cherché du travail toute la semaine. Personne ne m’a embauché.

Sa mère posa doucement une main sur son épaule.
-
Pardonne -nous. Nous faisons tout notre possible.
Ces paroles furent comme un coup de poignard. Damien comprit que ses parents souffraient autant
que lui.

Le lendemain, il décida de travailler davantage. Après les cours, il passait plusieurs heures au marché
Nkoabang à transporter des lourds sacs de riz, des cartons d’huile et savons des cageots de tomates.
Ses mains étaient couvertes d’ampoules. Son dos lui faisait souffrit. Pourtant, il ne se plaignait
jamais. Un vieux commerçant, nommé papa Martin, observait sauvent ce jeune garçon courageux

-
Damien, pourquoi travailles-tu autant à ton âge ?
Le jeune homme répondit avec calme :
-

Parce que je veux terminer mes études. Un jour, je deviendrais grand entrepreneur. Je
créerai des entreprises qui donnerons du travail a beaucoup de personnes.
Le vieil homme esquissa un sourire.

-
Les grands hommes commencent sauvent par de petits sacrifices. Ne perd jamais la
détermination. Ces mots donnèrent à Damien une force nouvelle.


Pendant plusieurs semaines, il économisa chaque franc gagné. Lorsqu’il réunit en fin la somme
nécessaire, il se rendit au collège pour payer ses frais de scolarité. En sortant du bureau du
comptable, il leva les yeux vers le ciel.


Pour la première fois, il comprit que chaque obstacle franchi le rapprochait se son rêve. Il ignorait
encore que les difficultés ne faisaient que commerce. Mais il avait désormais une certitude : tant
qu’il garderait la foi, le courage et la discipline, rien ne pourrait l’empêcher de réussir.


`,
        durationMin: 8
      },

       {
        id: 'lpp-ch3',
        title: 'Chapitre II : Les leçons du marché',
        content: `Le marché de Nkoabang s’éveillait bien avant le lever du soleil. Dès cinq heure du matin, les premiers
commerçants installaient leurs marchandises. Les cris des vendeurs se mêlaient au bruit des camions
qui déchargeaient des sacs de riz des cartons de savons, des cageots de tomates et des régimes de
bananes plantains.

Pour Damien, ce marché était devenu une seconde école. Chaque après-midi, après les cours, il
déposait son cartable à la maison et repartait aussitôt vers le marché. Il y retrouvait les porteurs, les
commerçants et les revendeurs de ferraille qui le connaissaient déjà.

- Damien, viens m’aider à transporter ces sacs ! criait sauvent une commerçante. Sans hésiter,
il chargeait les lourds sacs sur son dos et parcourait plusieurs mètres sous un soleil brûlant. A
la fin de journée, il gagnait parfois mille francs CFA, parfois deux mille lorsqu’il avait de la
chance.
Un samedi matin, alors qu’il aidait un vieil homme à ranger son magasin, celui-ci l’observa
avec attention.

- Tu t’appelles comment, mon garçon ?
- Damien, monsieur.
- Et pourquoi travailles-tu autant ?
 Damien hésita quelques secondes avant de répondre.
- Je veux terminer mes études. Un jour, je veux devenir un grand entrepreneur pour sortie ma
famille de la pauvreté.
Le vieil homme sourit.
- Je m’appelle Martin. Ici, tout le monde m’appelle papa Martin. Ecoute-moi bien, Damien.
Beaucoup de jeunes cherchent seulement à gagner de l’argent. Très peu cherchent à
comprendre comment le créer.

Ces paroles intriguèrent Damien.
A partir de ce jour, chaque fois qu’il terminait son travail, il restait quelques minutes auprès
de papa martin, le vieil homme lui expliquait comment réinvestir les bénéfices au lieu de tout
dépenser et surtout, comment gagner la confiance des clients.

- L’argent vient et repart, disait-il. Mais une bonne réputation peut nourrir un homme toute sa
vie.

Ces leçons marquèrent profondément Damien. Quelques jours plus tard, papa Martin lui
remit un vieux cahier.

- Tiens. A partir d’aujourd’hui, note tout ce que tu gagnes et tout ce que tu dépense. Un
entrepreneur doit connaitre la valeur de chaque franc.
Damien suivit ce conseil avec rigueur. Chaque soir, à la lumière d’une lampe ç pétrole, il
inscrivait soigneusement ses recettes et ses dépenses. Peu à peu, il apprit à économiser.
Pendant ce temps, les résultats scolaires continuaient de s’améliorer. Ses professeurs
remarquaient son sérieux et son assiduité. Un après-midi son professeur d’économie
l’interrogea devant toute la classe.
- Damien, que veux-tu faire plus tard ?
Le jeune garçon e leva lentement.

- Monsieur, je veux créer des entreprises qui donneront du travail aux jeunes. Je veux prouver
que même un enfant pauvre peut réussir honnêtement.
Toute la classe éclata de rire.

- Toi ? Un chef d’entreprise ? Lança un élève en se moquant.

Damien ne répondit pas. Il se rassit calmement.
Au fond de lui, il se fit une promesse : un jour, ceux qui riaient de lui verraient que les rêves
ne sont pas faits pour être abandonnés, mais pour être réalisés.
Les années passaient, et le jeune garçon devenait un homme. Sans le savoir, la vie s’apprêtait
à lui offrit une rencontre qui allait bouleverser son destin.

`,
        durationMin: 8
      }
    ]
  },
  {
    id: 'conseils-ecriture',
    title: 'Le Manuel du Créateur',
    author: 'Ghislain & AI',
    genre: 'Édition & CMS',
    description: 'Un guide exclusif conçu pour vous aider à prendre en main l\'interface CMS intuitive de votre nouvelle plateforme de lecture-écriture dynamique.',
    coverColor: 'from-emerald-950 via-slate-900 to-zinc-950',
    coverDesignType: 'minimalist',
    createdAt: '2026-06-01T12:00:00Z',
    tags: ['Tutoriel', 'Écriture', 'Édition', 'Création'],
    pagesCount: 45,
    chapters: [
      {
        id: 'mdc-ch1',
        title: 'Chapitre I : Dompter l\'Édition Numérique',
        content: `Bienvenue dans votre nouvel outil de création littéraire ! Ce livre a été écrit directement à l'aide de notre formulaire d'administration. Grâce à ce CMS intuitif, vous n'avez plus besoin d'exporter manuellement vos livres en PDF pour les partager avec le monde entier.

Vous pouvez structurer votre livre chapitre par chapitre. Chaque chapitre comporte un titre clair, une estimation intelligente du temps de lecture, et des paragraphes rédigés de manière à s'adapter parfaitement à tous les types d'écrans (smartphone, tablette, ou ordinateur de bureau).

Notre liseur d'e-books intègre plusieurs options de confort : un mode nuit ultra-reposant, une palette sépia chaleureuse pour reproduire l'effet du papier jauni de nos bibliothèques d'antan, ainsi qu'un simulateur de téléchargement PDF qui compile de manière impeccable la mise en page de vos récits.`,
        durationMin: 4
      },
      {
        id: 'mdc-ch2',
        title: 'Chapitre II : Conseils pour un Formatage Impeccable',
        content: `Pour maximiser le confort de vos lecteurs, nous vous recommandons de composer des chapitres de taille moyenne (environ 300 à 1000 mots par chapitre). Cela permet une lecture fluide pendant les trajets quotidiens.

Utilisez des retours à la ligne généreux pour laisser respirer vos idées. Ne surchargez pas vos paragraphes. N'oubliez pas d'assigner des genres et mots-clés (tags) pertinents à vos livres afin que vos visiteurs puissent facilement les retrouver grâce au moteur de recherche dynamique intégré à l'accueil.

N'attendez plus ! Passez en mode Éditeur via l'onglet en haut de l'écran, entrez vos propres récits ou importez des fichiers existants, et donnez vie à votre œuvre sur mesure.`,
        durationMin: 5
      }
    ]
  },


  
];
