import { useRoutes } from 'react-router-dom';

import WithAuthRoutes from 'routes/WithAuthRoutes';
import WithoutAuthRoutes from 'routes/WithoutAuthRoutes';


export default function Routes() {
  return useRoutes([WithAuthRoutes, WithoutAuthRoutes]);
}
