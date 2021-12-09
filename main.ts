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
    radio.sendValue("drawM", 1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("memclr", 1)
    basic.showIcon(IconNames.Skull)
    basic.pause(1000)
    basic.clearScreen()
})
pins.onPulsed(DigitalPin.P16, PulseValue.Low, function () {
    coloridx = false
})
pins.onPulsed(DigitalPin.P14, PulseValue.Low, function () {
    radio.sendValue("dispM", 1)
})
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    show = 0
    radio.sendValue("commit", 1)
})
function plot_on_LED () {
    tmpX = pins.map(
    p2val,
    0,
    1023,
    4,
    0
    )
    tmpY = pins.map(
    p1val,
    0,
    1023,
    0,
    4
    )
    led.unplot(prevX, prevY)
    led.plot(tmpX, tmpY)
    prevX = tmpX
    prevY = tmpY
}
let tmpP1 = 0
let tmpP2 = 0
let prevY = 0
let prevX = 0
let p1val = 0
let tmpY = 0
let p2val = 0
let tmpX = 0
let show = 0
let coloridx = false
radio.setGroup(1)
serial.writeValue("x", 0)
serial.writeNumbers([pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)])
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
coloridx = false
basic.forever(function () {
    p1val = pins.analogReadPin(AnalogPin.P1)
    p2val = pins.analogReadPin(AnalogPin.P2)
    if (Math.abs(tmpP2 - p2val) > 20 || Math.abs(tmpP1 - p1val) > 20) {
        if (show) {
            radio.sendValue("10000x+y", p1val * 10000 + p2val)
        } else {
            radio.sendValue("cursor", p1val * 10000 + p2val)
        }
        tmpP1 = p1val
        tmpP2 = p2val
    } else {
        basic.pause(20)
    }
})
