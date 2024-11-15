const Name = require('../models/tableListModel');

const tableListController = {
    getAllNames: (req, res) => {
        Name.getAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
    updateStatus: (req, res) => {
        const { id, status } = req.body;
        Name.updateStatus(id, status, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Cập nhật trạng thái thành công' });
        });
    }
};

module.exports = tableListController;



