import { Application } from 'express';

import createServer from './utils/server';
import { environment } from './environments/environment';

const app: Application = createServer();
const PORT: number = environment.port;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
