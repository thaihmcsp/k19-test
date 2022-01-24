const mongoose = require("./connectDB"); // gọi mongoose vào

const UserSchema = mongoose.Schema(
  {
    // tạo mẫu bảng
    username: String,
    password: String,
    age: Number,
    class: String,
    avatar: String,
    role: {
      type: String,
      default: 'user'
    }
  },
  { collection: "hocSinh" }
);

const UserModel = mongoose.model("hocSinh", UserSchema);
// công cụ tương tác vs bảng cụ thể

module.exports = UserModel;