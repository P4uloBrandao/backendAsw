const User = require('../models/UserSchema');

const userController = {};

userController.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const {
      nome,
      dataNascimento,
      genero,
      morada,
      localidade,
      codigoPostal,
      telefone,
      email,
      password,
      preferencias
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        nome,
        dataNascimento,
        genero,
        morada,
        localidade,
        codigoPostal,
        telefone,
        email,
        password,
        preferencias
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


userController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = userController;
