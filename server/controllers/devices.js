const usbDetect = require('usb-detection');
usbDetect.startMonitoring();

exports.getConnectedDevices = async (req, res) => {
    let devices = [];

    try {
        devices = await usbDetect.find();
        devices = await devices.map(item => (
            {
                vendorId: item.vendorId,
                productId: item.productId,
                descriptor: item.deviceName,
                type: item.deviceName.toLowerCase().includes("hub") ? "HUB" : "Device",
                deviceAddress: item.deviceAddress
            }
        ));

        usbDetect.on('change', async function (device) {
            const foundDevice = await devices.find(item => item.deviceAddress !== device.deviceAddress);
            if (foundDevice === undefined) {
                await devices.push(device);
            } else {
                devices = await devices.filter(item => item.deviceAddress !== device.deviceAddress);
            }
        });
    } catch (err) {
        return res.status(500).json(err.stack)
    }

    res.status(200).json(devices);
};