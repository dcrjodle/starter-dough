import { LoginForm } from '../components/auth/LoginForm';
import { Page } from '../components/Page';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <Page maxWidth="md" centered>
      <LoginForm onSuccess={() => navigate('/')} />
    </Page>
  );
}
