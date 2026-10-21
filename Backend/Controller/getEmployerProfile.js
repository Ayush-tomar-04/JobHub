const Employer = require("../Models/employer");

exports.getEmployerProfile = async (req, res) => {
    try {
        const employerId = req.user.userId;

        const employer = await Employer.findById(employerId)
            .select("-password")
            .populate(
                "companyId",
                "name description website location employeeSize foundedYear"
            );

        if (!employer) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Employer not found"
            });
        }

        if (!employer.companyId) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: employer,
            message: "Employer profile fetched successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to fetch employer profile"
        });
    }
};