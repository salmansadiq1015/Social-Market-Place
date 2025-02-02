import { Server as SocketIOServer } from "socket.io";

export const initialSocketServer = async (server) => {
  const io = new SocketIOServer(server);
  //   Connect To Socket Server
  io.on("connection", async (socket) => {
    console.log("Connected: User is online!");

    const { userID } = socket.handshake.query;

    console.log("User ID:", userID);

    let user;

    // -------------------------Handle disconnect User----------------->
    socket.on("disconnect", async () => {
      // console.log(`User with ID: ${userID} disconnected!`);
      // try {
      //   if (user) {
      //     await userModel.findByIdAndUpdate(
      //       userID,
      //       { isOnline: false },
      //       { new: true }
      //     );
      //     console.log(`User ${user.firstName} ${user.lastName} is now offline.`);
      //     // Emit event for all users to update their chat lists
      //     io.emit("newUserData", { userID, isOnline: false });
      //   } else {
      //     console.warn(`User ${userID} was not found when disconnecting.`);
      //   }
      // } catch (error) {
      //   console.error("Error updating user's offline status:", error);
      // }
    });
  });
};
