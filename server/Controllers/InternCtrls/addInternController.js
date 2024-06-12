const Intern = require("../../Models/Intern");

const addInternController = async (req, res) => {
    try {
        const { name, domain, duration, technologies, startDate, endDate } =
            req.body;
        let intern = await Intern.findOne({ name });
        if (intern) {
            return res.status(400).json({
                message: "Sorry an intern with this name already exits.",
            });
        }
        intern = await Intern.create({
            name,
            domain,
            duration,
            technologies,
            startDate,
            endDate,
        });
        return res
            .status(200)
            .json({ message: "Added intern successfully.", intern });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Interval Server error", msg: error?.message });
    }
};

module.exports = addInternController;
