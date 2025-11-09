import { LoginForm } from '../components/auth/LoginForm';
import { Page } from '../components/Page';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <Page padding="lg">
      <Layout
        direction="column"
        align="center"
        justify="center"
        className="min-h-[calc(100vh-200px)]"
      >
        <LoginForm onSuccess={() => navigate('/')} />
      </Layout>
    </Page>
  );
}
