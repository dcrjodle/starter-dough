import { SignupForm } from '../components/auth/SignupForm';
import { Page } from '../components/Page';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <Page padding="lg">
      <Layout
        direction="column"
        align="center"
        justify="center"
        className="min-h-[calc(100vh-200px)]"
      >
        <SignupForm onSuccess={() => navigate('/')} />
      </Layout>
    </Page>
  );
}
