/* The code is importing the `AddressInfo` type from the `net` module and the `server` object from the
`./server/server` file. */
import { config } from "dotenv";
import server from "./server/server";
config();

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
