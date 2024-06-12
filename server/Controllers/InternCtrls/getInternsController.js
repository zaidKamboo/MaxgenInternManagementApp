const Intern = require("../../Models/Intern");

const getInternsController = async (req, res) => {
    try {
        let interns = await Intern.find();
        return res
            .status(200)
            .json({ interns, message: "Fetched interns successfully..." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error?.message, error });
    }
};

module.exports = getInternsController;
