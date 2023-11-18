/* The code is importing the `AddressInfo` type from the `net` module and the `server` object from the
`./server/server` file. */
import { config } from "dotenv";
import { AddressInfo } from "net";
import server from "./server/server";
config();

server.listen(process.env.PORT || 3000, () => {
  const address = server.address() as AddressInfo;
  console.log(`Server started on port ${address.port}`);
});
