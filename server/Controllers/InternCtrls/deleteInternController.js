const Intern = require("../../Models/Intern");

const deleteInternController = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Intern not found." });
        }
        let intern = await Intern.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ message: "Intern deleted successfully.", intern });
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({ message: error?.message, error });
    }
};

module.exports = deleteInternController;
