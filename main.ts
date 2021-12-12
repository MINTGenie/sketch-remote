enum RadioMessage {
    message1 = 49434
}
pins.onPulsed(DigitalPin.P16, PulseValue.High, function () {
    if (!(coloridx)) {
        coloridx = true
        radio.sendValue("coloridx", 1)
        basic.pause(10)
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
    basic.pause(10)
})
pins.onPulsed(DigitalPin.P14, PulseValue.Low, function () {
    radio.sendValue("dispM", 1)
})
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    show = 0
    radio.sendValue("commit", 1)
})
function plot_on_LED () {
    tmpX = Math.round(pins.map(
    p2val,
    10,
    1010,
    4,
    0
    ))
    tmpY = Math.round(pins.map(
    p1val,
    10,
    1010,
    0,
    4
    ))
    led.unplot(prevX, prevY)
    led.plot(tmpX, tmpY)
    prevX = tmpX
    prevY = tmpY
}
let joy_val = 0
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
let Joystk_filter_max = 1023
basic.forever(function () {
    p1val = pins.analogReadPin(AnalogPin.P1)
    p2val = pins.analogReadPin(AnalogPin.P2)
    if (Math.abs(tmpP2 - p2val) > 20 || Math.abs(tmpP1 - p1val) > 20) {
        joy_val = Math.round(pins.map(
        p1val,
        0,
        1023,
        0,
        Joystk_filter_max
        )) * 10000 + Math.round(pins.map(
        p2val,
        0,
        1023,
        0,
        Joystk_filter_max
        ))
        if (show) {
            radio.sendValue("10000x+y", joy_val)
        } else {
            radio.sendValue("cursor", joy_val)
        }
        tmpP1 = p1val
        tmpP2 = p2val
    }
})
basic.forever(function () {
    plot_on_LED()
    basic.pause(100)
})
