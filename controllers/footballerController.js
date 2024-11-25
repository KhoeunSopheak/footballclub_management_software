const Footballer = require('../model/footballerModel'); 

const createFootballer = async (req, res) => {
    try {
        const { name, age, position, team, stats, matches, goals, assists } = req.body;
        const newFootballer = new Footballer({
            name,
            age,
            position,
            team,
            stats,
            matches,
            goals,
            assists
        });
        const savedFootballer = await newFootballer.save();

        return res.status(201).json({ 
            message: 'Create successfully', 
            footballer: { 
                id: savedFootballer._id, 
                name, 
                age, 
                position, 
                team, 
                stats, 
                matches, 
                goals, 
                assists 
            } 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error.' });
    }
};

const getAllFootballer = async (req, res) => {
    try {
        const footballers = await Footballer.find();
        return res.status(200).json({ message: 'Fetched footballer successfully' , footballers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const getFootballerId = async (req, res) => {
    try {
        const id = req.params.id;
        const footballerId = await Footballer.findById(id);
        return res.status(200).json(footballerId);
    } catch (error) {
        console.error(error);
        return res.status(5000).json({ error: 'Internal Server error'});
    }
};

const updateFootballer = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updateFootballer = await Footballer.findByIdAndUpdate(
            id,
            updates, { new: true, runValidators: true} 
        );
        if (!updateFootballer) {
            return res.status(404).json({ error: 'Footballer not found' });
        }
        return res.status(200).json( { message: 'Updated footballer successfully', updateFootballer
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

const deleteFootballer = async (req, res) => {
    try {
        const id = req.params.id;
        const footballerId = await Footballer.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Deleted footballer successfully' ,footballerId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server error'});
    }
};

module.exports = { createFootballer, 
                   getAllFootballer, 
                   getFootballerId, 
                   updateFootballer, 
                   deleteFootballer};
