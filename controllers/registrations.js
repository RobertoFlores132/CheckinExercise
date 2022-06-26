const { Registration } = require('../models/registration')

const getAllRegistrations = async (req, res, next) => {
    try{
        const registrations = await Registration.findAll();

        res.status(200).json({ registrations })
    }catch (err){}
};

const getRegistrationById = async (req, res, next) => {
    try{
        const { id } = req.params;

        const registrationid = await Registration.findOne({ where: { id } });

        if(!registrationid) {
            return res.status(404).json({
                status: 'error',
                message: 'Registration not found'
            });
        };

        res.status(200).json({ registrationid });
    }catch (err){}
};

const checkIn = async (req, res, next) => {
    try{
        const { entranceTime } = req.body;

        const entrance = await Registration.create({ entranceTime });

        res.status(201).json({
            entrance
        });
    }catch (err){
        console.log(err)
    }
};

const checkOut = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { exitTime } = req.body;

        const registrationid = await Registration.findOne({ where: { id } });

        if(!registrationid) {
            return res.status(404).json({
                status: 'error',
                message: 'Registration not found'
            });
        };

        await registrationid.update({ exitTime, status: 'out' });

        res.status(204).json({ status: 'success' });
    }catch (err){}
};

const cancelRegistration = async (req, res, next) => {
    try{
        const { id } = req.params;

        const registrationid = await Registration.findOne({ where: { id } });

        if(!registrationid) {
            return res.status(404).json({
                status: 'error',
                message: 'Registration not found'
            });
        };

        await registrationid.update({ status: 'cancelled' });

        res.status(204).json({ status: 'success' });
    }catch (err){}
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    checkIn,
    checkOut,
    cancelRegistration
};