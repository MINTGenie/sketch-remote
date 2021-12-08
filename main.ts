enum RadioMessage {
    message1 = 49434
}
pins.onPulsed(DigitalPin.P16, PulseValue.High, function () {
    if (!(coloridx)) {
        coloridx = true
        radio.sendValue("coloridx", 1)
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendValue("save_now", 1)
})
pins.onPulsed(DigitalPin.P15, PulseValue.High, function () {
    show = 1
})
pins.onPulsed(DigitalPin.P13, PulseValue.Low, function () {
    radio.sendValue("draw_mode", 1)
})
pins.onPulsed(DigitalPin.P16, PulseValue.Low, function () {
    coloridx = false
})
pins.onPulsed(DigitalPin.P14, PulseValue.Low, function () {
    radio.sendValue("disp_mode", 1)
})
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    show = 0
    radio.sendValue("draw", 1)
})
let prevY = 0
let prevX = 0
let tmpY = 0
let tmpX = 0
let show = 0
let coloridx = false
radio.setGroup(1)
serial.writeValue("x", 0)
serial.writeNumbers([pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)])
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
coloridx = false
basic.forever(function () {
    tmpX = pins.map(
    pins.analogReadPin(AnalogPin.P2),
    0,
    1023,
    31,
    0
    )
    tmpY = pins.map(
    pins.analogReadPin(AnalogPin.P1),
    0,
    1023,
    0,
    31
    )
    if (!(prevX == tmpX && prevY == tmpY)) {
        if (show) {
            radio.sendValue("10000x+y", pins.analogReadPin(AnalogPin.P1) * 10000 + pins.analogReadPin(AnalogPin.P2))
        } else {
            radio.sendValue("cursor", pins.analogReadPin(AnalogPin.P1) * 10000 + pins.analogReadPin(AnalogPin.P2))
            led.unplot(prevX / 4 - 1, prevY / 4 - 1)
            led.plot(tmpX / 4 - 1, tmpY / 4 - 1)
        }
        prevX = tmpX
        prevY = tmpY
    }
    basic.pause(50)
})
