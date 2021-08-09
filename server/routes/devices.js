const router = require("express").Router();
const devicesController = require("../controllers/devices");

router.get("/", devicesController.getConnectedDevices);

module.exports = router;