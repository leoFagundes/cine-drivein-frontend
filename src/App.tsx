import { AuthProvider } from './Contexts/AuthContext';
import './Global.scss';
import Home from './Pages/Home';
import Router from './routes';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App;
