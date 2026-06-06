import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'le-petit-prince',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Conte Philosophique',
    description: 'Une œuvre poétique et philosophique sous l\'apparence d\'un conte pour enfants, interrogeant l\'amour, l\'amitié et le sens de la vie.',
    coverColor: 'from-blue-950 via-slate-900 to-indigo-950',
    coverDesignType: 'artistic',
    createdAt: '2026-01-15T08:00:00Z',
    tags: ['Classique', 'Philosophie', 'Poésie', 'Jeunesse'],
    pagesCount: 96,
    chapters: [
      {
        id: 'lpp-ch1',
        title: 'Chapitre I : Le Dessin de Boa',
        content: `Lorsque j'avais six ans j'ai vu, une fois, une magnifique image, dans un livre sur la Forêt Vierge qui s'appelait "Histoires Vécues". Ça représentait un serpent boa qui avalait un fauve. Voilà la copie du dessin.

On disait dans le livre : "Les serpents boas avalent leur proie tout entière, sans la mâcher. Ensuite ils ne peuvent plus bouger et ils dorment pendant les six mois de leur digestion."

J'ai alors beaucoup réfléchi sur les aventures de la jungle et, à mon tour, j'ai réussi, avec un crayon de couleur, à tracer mon premier dessin. Mon dessin numéro 1. Il était comme ça :

J'ai montré mon chef-d'œuvre aux grandes personnes et je leur ai demandé si mon dessin leur faisait peur.
Elles m'ont répondu : "Pourquoi un chapeau ferait-il peur ?"

Mon dessin ne représentait pas un chapeau. Il représentait un serpent boa qui digérait un éléphant. J'ai alors dessiné l'intérieur du serpent boa, afin que les grandes personnes puissent comprendre. Elles ont toujours besoin d'explications. Mon dessin numéro 2 était comme ça...

Les grandes personnes m'ont conseillé de laisser de côté les dessins de serpents boas ouverts ou fermés, et de m'intéresser plutôt à la géographie, à l'histoire, au calcul et à la grammaire. C'est ainsi que j'ai abandonné, à l'âge de six ans, une magnifique carrière de peintre. J'avais été découragé par l'insuccès de mon dessin numéro 1 et de mon dessin numéro 2. Les grandes personnes ne comprennent jamais rien toutes seules, et c'est fatigant, pour les enfants, de toujours et toujours leur donner des explications.`,
        durationMin: 5
      },
      {
        id: 'lpp-ch2',
        title: 'Chapitre II : S\'il vous plaît... dessine-moi un mouton !',
        content: `J'ai ainsi vécu seul, sans personne avec qui parler véritablement, jusqu'à une panne dans le désert du Sahara, il y a six ans. Quelque chose s'était cassé dans mon moteur. Et comme je n'avais avec moi ni mécanicien, ni passagers, je me préparai à tenter, tout seul, une réparation difficile. C'était pour moi une question de vie ou de mort. J'avais à peine de l'eau à boire pour huit jours.

Le premier soir je me suis donc endormi sur le sable à mille milles de toute terre habitée. J'étais bien plus isolé qu'un naufragé sur un radeau au milieu de l'océan. Alors vous imaginez ma surprise, au lever du jour, quand une drôle de petite voix m'a réveillé. Elle disait :
— S'il vous plaît... dessine-moi un mouton !
— Hein !
— Dessine-moi un mouton...

Je me suis dressé sur mes pieds comme si j'avais été frappé par la foudre. J'ai bien frotté mes yeux. J'ai bien regardé. Et j'ai vu un petit bonhomme tout à fait extraordinaire qui me considérait avec gravité. Voilà le meilleur portrait que, plus tard, j'ai réussi à faire de lui.

Je regardai donc cette apparition avec des yeux tout ronds d'étonnement. N'oubliez pas que je me trouvais à mille milles de toute région habitée. Or mon petit bonhomme ne me semblait ni égaré, ni mort de fatigue, ni mort de faim, ni mort de soif, ni mort de peur. Il n'avait en rien l'apparence d'un enfant perdu au milieu du désert, à mille milles de toute région habitée. Quand je réussis enfin à parler, je lui dis :
— Mais... qu'est-ce que tu fais là ?
Et il me répéta alors, tout doucement, comme une chose très sérieuse :
— S'il vous plaît... dessine-moi un mouton...`,
        durationMin: 8
      }
    ]
  },
  {
    id: 'l-art-de-la-guerre',
    title: 'L\'Art de la Guerre',
    author: 'Sun Tzu',
    genre: 'Philosophie & Stratégie',
    description: 'Le premier traité de stratégie militaire écrit au monde. Une leçon intemporelle de résolution de conflits s\'appliquant à tous les aspects de la vie quotidienne.',
    coverColor: 'from-amber-950 via-stone-905 to-neutral-950',
    coverDesignType: 'classic',
    createdAt: '2026-02-10T10:00:00Z',
    tags: ['Stratégie', 'Philosophie', 'Sagesse', 'Histoire'],
    pagesCount: 140,
    chapters: [
      {
        id: 'adg-ch1',
        title: 'Chapitre I : Des Plans et Estimations',
        content: `Sun Tzu dit : La guerre est d'une importance vitale pour l’État. C'est le domaine de la vie et de la mort, la voie vers la survie ou la ruine. Par conséquent, il est indispensable de l’étudier en détail.

Pour estimer ses chances de succès, il faut analyser la situation selon cinq facteurs fondamentaux :
1. La Loi Morale (faire en sorte que le peuple soit en parfaite harmonie avec son souverain).
2. Le Ciel (les forces de la nature, le climat, le chaud et le froid, le cycle des saisons).
3. La Terre (les distances, le relief du terrain, la sécurité et le danger).
4. Le Commandant (les vertus de sagesse, de sincérité, de bienveillance, de courage et de rigueur).
5. La Discipline (l'organisation des troupes, la logistique et l'encadrement).

Toute campagne militaire repose sur l'art de l’illusion. Quand nous sommes capables d'attaquer, nous devons paraître incapables de le faire ; quand nous utilisons nos forces, nous devons sembler inactifs ; quand nous sommes proches de l’ennemi, nous devons lui faire croire que nous sommes loin.`,
        durationMin: 6
      },
      {
        id: 'adg-ch2',
        title: 'Chapitre II : De la Conduite de l\'Action',
        content: `Dans les opérations militaires, une fois la décision prise d'engager le combat, l'objectif absolu doit être une victoire rapide. Si la guerre se prolonge, les ressources de l’État s'épuisent, le tranchant des armes s’émousse et le courage des hommes s’effrite.

Aucun pays n'a jamais tiré profit d’une guerre prolongée. Un général habile sait vivre sur le territoire ennemi et s’emparer des provisions de l’adversaire. Nourrir ses armées aux dépens de l'ennemi vaut vingt fois plus cher que de transporter ses propres rations depuis de longues distances.

Traitez vos prisonniers de guerre avec humanité et respect, car l'intérêt principal est de vaincre l'ennemi et de s'enrichir par sa propre défaite, sans détruire votre propre intégrité.`,
        durationMin: 7
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
  }
];
