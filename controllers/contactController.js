const Contact = require("../model/Contact");

const handleContact = async (req, res) => {
    const { name, email, mobileNo, message } = req.body;

    try {
        const newContact = await Contact.create({
            name: name,
            email: email,
            mobileNumber: mobileNo,
            message: message
        });
        res.status(200).json({ "message": "ok" });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

module.exports = { handleContact };