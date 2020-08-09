import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';


export default [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true
      },
      {
        component: About,
        path: '/about'
      },
      {
        component: NotFound,
      },
    ]
  }
]
