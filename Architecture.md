SMMC-Engin/
├── app/                                  # Routage Expo Router
│   ├── index.tsx                         # Page accueil (première ouverture de l'app)
│   ├── login.tsx                         # Page Login
│   │
│   ├── (agent)/                          # Routes Agent
│   │   ├── _layout.tsx                   # Tabs Agent
│   │   ├── dashboard.tsx                 # Dashboard Agent
│   │   ├── mouvements.tsx                # Mouvements des engins
│   │   └── profile.tsx                   # Profil (commun)
│   │
│   ├── (operateur)/                     # Routes Opérateur
│   │   ├──_layout.tsx                   # Tabs Conducteur
│   │   ├── dashboard.tsx                 # Dashboard Conducteur
│   │   ├── incident.tsx                  # Déclaration incident
│   │   └── profile.tsx                   # Profil
│   │
│   ├── (technicien)/                     # Routes Technicien
│   │   ├── _layout.tsx                   # Tabs Technicien
│   │   ├── dashboard.tsx                 # Dashboard Technicien
│   │   ├── maintenance.tsx               # Gestion maintenance
│   │   └── profile.tsx                   # Profil
│   │
│   ├──_layout.tsx                       # Layout racine (Providers globaux)
│   └── _authGuard.tsx                    # Redirection selon rôle
│
├── components/                           # Composants UI
│   ├── core/                             # Composants basiques
│   │   ├── Button.tsx                    # Bouton générique
│   │   ├── Input.tsx                     # Champ texte
│   │   ├── Card.tsx                      # Conteneur
│   │   └── Loader.tsx                    # Loader/Spinner
│   └── layout/                           # Composants structurants
│       ├── Header.tsx                    # Header commun
│       └── TabBarIcon.tsx                # Wrapper d’icônes pour tabs
│
├── config/                               # Config centrale
│   ├── env.ts                            # Variables d’environnement
│   └── axiosConfig.ts                    # Axios instance
│
├── constants/                            # Constantes globales
│   ├── roles.ts                          # Rôles app
│   ├── routes.ts                         # Routes nommées
│   └── storage.ts                        # Clés AsyncStorage
│
├── context/                              # Context API
│   ├── AuthContext.tsx                   # Fournit user, rôle, token
│   └── NotificationContext.tsx           # Notifications push
│
├── hooks/                                # Hooks personnalisés
│   ├── useAuth.ts                        # Gestion login/logout, user
│   ├── useAxios.ts                       # Axios avec token auto
│   ├── useAuthGuard.ts                   # Redirection selon rôle
│   ├── useNotifications.ts               # Gestion notifications Expo
│   └── usePaginatedList.ts               # Liste paginée générique
│
├── services/                             # API Laravel
│   ├── auth.service.ts                   # Auth (login/logout)
│   ├── engins.service.ts                 # CRUD engins
│   ├── incidents.service.ts              # CRUD incidents
│   └── maintenance.service.ts            # CRUD maintenances
│
├── utils/                                # Helpers purs
│   ├── date.ts                           # Formatage dates
│   ├── number.ts                         # Formatage numériques
│   └── mapper.ts                         # Mapping DTO → UI
│
├── validation/                           # Schémas Zod
│   ├── auth.schema.ts
│   ├── incident.schema.ts
│   └── maintenance.schema.ts
│
├── assets/                               # Ressources statiques
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── tests/                                # Tests RN
│   ├── unit/                             # Jest
│   └── e2e/                              # Detox
│
├── app.json                              # Config Expo
├── tailwind.config.js                    # NativeWind config
├── babel.config.js                       # Aliases + plugins
├── tsconfig.json                         # Alias paths
├── .env                                  # Variables d’env
└── package.json
