import { shared } from "node-blox-sdk";
import { getBody } from "./utils.js";

const delete_user = async (req, res) => {
  // health check
  if (req.params["health"] === "health") {
    res.write(JSON.stringify({ success: true, msg: "Health check success" }));
    res.end();
  }

  // Getting shared prisma client
  const { prisma } = await shared.getShared();

  const data = await getBody(req);
  const { system_user_id } = data;
  const dbRes = await prisma.user.delete({
    where: { system_user_id },
  });

  res.write(
    JSON.stringify({
      success: true,
      msg: `User deleted succesfully`,
      data: dbRes,
    })
  );
  res.end();
};

export default delete_user;
