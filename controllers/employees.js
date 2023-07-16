const { prisma } = require('../prisma/prisma-client');

const getAll = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get employees' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json('Please, fill the required fields');
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        age: Number(data.age),
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    return res.status(204).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAll,
  addEmployee,
  removeEmployee,
  edit,
  getOne,
};
