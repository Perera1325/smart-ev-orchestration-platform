const stations = require('../models/stations');

exports.getAllStations = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching stations'
    });
  }
};

exports.getStationById = (req, res) => {
  try {
    const station = stations.find(s => s.id === req.params.id);
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }
    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching station'
    });
  }
};
