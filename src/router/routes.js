import MainLayout from 'layouts/MainLayout.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'
import IndexPage from 'pages/IndexPage.vue'
import AboutPage from 'src/pages/AboutPage.vue';
import CardDatabasePage from 'src/pages/CardDatabasePage.vue';
import DeckBuilderPage from 'src/pages/DeckBuilderPage.vue';
import MyCardsPage from 'src/pages/CardTrackerPage.vue';
import SettingsPage from 'src/pages/SettingsPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      {path: 'card-tracker', component: MyCardsPage},
      {path: 'card-db', component: CardDatabasePage},
      {path: 'decks', component: DeckBuilderPage},
      {path: 'about', component: AboutPage},
      {path: 'settings', component: SettingsPage}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
]

export default routes
