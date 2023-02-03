import React from 'react'
import Loading from '../components/helper/Loading';
const DatabaseTotal = React.lazy(() => import('./DatabaseTotal'));
const TheGreatestStatistics = React.lazy(() => import('./TheGreatestStatistics'));
const FiftyGreatestGames = React.lazy(() => import('./FiftyGreatestGames'));
const TheBestGames = React.lazy(() => import('./TheBestGames'));
const CompaniesStatistics = React.lazy(() => import('./CompaniesStatistics'));


function PageSwitcher({ page }) {
  const pages = {
    1: <DatabaseTotal />,
    2: <CompaniesStatistics />,
    3: <TheGreatestStatistics />,
    4: <TheBestGames />,
    5: <FiftyGreatestGames />,
  };

  return (
    <React.Suspense fallback={<Loading />}>
      {pages[page]}
    </React.Suspense>
  );
}

export default PageSwitcher;
