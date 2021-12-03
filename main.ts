enum RadioMessage {
    message1 = 49434
}
pins.onPulsed(DigitalPin.P16, PulseValue.High, function () {
    coloridx += 1
    if (coloridx > 9) {
        coloridx = 0
    }
    radio.sendValue("coloridx", coloridx)
})
pins.onPulsed(DigitalPin.P15, PulseValue.High, function () {
    show = 1
})
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    show = 0
    radio.sendValue("draw", 1)
})
let show = 0
let coloridx = 0
radio.setGroup(1)
serial.writeValue("x", 0)
serial.writeNumbers([pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)])
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
coloridx = 0
basic.forever(function () {
    if (show) {
        radio.sendValue("10000x+y", pins.analogReadPin(AnalogPin.P1) * 10000 + pins.analogReadPin(AnalogPin.P2))
        basic.pause(50)
    }
})
