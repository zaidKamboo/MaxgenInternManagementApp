const Intern = require("../../Models/Intern");

const editInternController = async (req, res) => {
    try {
        const { name, domain, startDate, endDate, technologies } = req.body;
        let intern = await Intern.findOne({ _id: req.params.id });
        if (!intern)
            return res
                .status(404)
                .json({ message: `Intern not found with the name ${name}.` });
        intern.name = name;
        intern.domain = domain;
        intern.startDate = startDate;
        intern.endDate = endDate;
        intern.technologies = technologies;
        await intern.save();
        return res
            .status(200)
            .json({ message: "Updated Details successfully...", intern });
    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({ error, message: error?.message });
    }
};

module.exports = editInternController;
