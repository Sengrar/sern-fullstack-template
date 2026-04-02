import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "manager", "user"]],
      },
    },
  });

  // Create
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
  });

  // Update (instance)
  User.beforeUpdate(async (user) => {
    if (user.changed("password") && user.password) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
  });

  // Update (bulk)
  User.beforeBulkUpdate(async (options) => {
    if (options.attributes.password) {
      options.attributes.password = await bcrypt.hash(
        options.attributes.password,
        SALT_ROUNDS
      );
    }
  });

  // Compare
  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Hide password
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};