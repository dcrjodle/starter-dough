import { Hero } from '../components/Hero';
import { Page } from '../components/Page';

export function HomePage() {
  return (
    <Page padding="none" maxWidth="full">
      <Hero />
    </Page>
  );
}
