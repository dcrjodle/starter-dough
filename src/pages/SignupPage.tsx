import { SignupForm } from '../components/auth/SignupForm';
import { Page } from '../components/Page';
import { useNavigate } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <Page maxWidth="md" centered>
      <SignupForm onSuccess={() => navigate('/')} />
    </Page>
  );
}
