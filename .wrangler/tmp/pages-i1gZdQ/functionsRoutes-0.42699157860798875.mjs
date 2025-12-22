import { onRequest as __api_algorithms__algo__ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/algorithms/[algo].ts"
import { onRequest as __api_shorturl___id___ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/shorturl/[[id]].ts"
import { onRequest as __api_timestamp___date___ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/timestamp/[[date]].ts"
import { onRequest as __api_fileanalyse_ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/fileanalyse.ts"
import { onRequest as __api_users_index_ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/users/index.ts"
import { onRequest as __api_whoami_ts_onRequest } from "/Users/fredy/freecodecamp-backend-algorithms/functions/api/whoami.ts"

export const routes = [
    {
      routePath: "/api/algorithms/:algo",
      mountPath: "/api/algorithms",
      method: "",
      middlewares: [],
      modules: [__api_algorithms__algo__ts_onRequest],
    },
  {
      routePath: "/api/shorturl/:id*",
      mountPath: "/api/shorturl",
      method: "",
      middlewares: [],
      modules: [__api_shorturl___id___ts_onRequest],
    },
  {
      routePath: "/api/timestamp/:date*",
      mountPath: "/api/timestamp",
      method: "",
      middlewares: [],
      modules: [__api_timestamp___date___ts_onRequest],
    },
  {
      routePath: "/api/fileanalyse",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_fileanalyse_ts_onRequest],
    },
  {
      routePath: "/api/users",
      mountPath: "/api/users",
      method: "",
      middlewares: [],
      modules: [__api_users_index_ts_onRequest],
    },
  {
      routePath: "/api/whoami",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_whoami_ts_onRequest],
    },
  ]