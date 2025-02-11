const bcrypt = require("bcryptjs");
const  User  = require("../Models/userModel"); 

async function hashExistingPasswords() {
  try {
    const users = await User.findAll();

    for (const user of users) {
      if (user.password.length < 60) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        await user.update({ password: hashedPassword });
      } else {
        console.log(
          `⚠️ User ${user.email} already has a hashed password. Skipping...`
        );
      }
    }
  } catch (error) {
    console.error("❌ Error updating passwords:", error);
  }
}

hashExistingPasswords();
