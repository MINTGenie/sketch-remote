enum RadioMessage {
    message1 = 49434
}
pins.onPulsed(DigitalPin.P16, PulseValue.High, function () {
    if (!(coloridx)) {
        coloridx = true
        radio.sendValue("coloridx", 1)
    }
})
pins.onPulsed(DigitalPin.P15, PulseValue.High, function () {
    show = 1
})
function show_on_led (prevX: number, prevY: number, curX: number, curY: number) {
    list = [
    Math.round(pins.map(
    prevX,
    0,
    1023,
    0,
    5
    )),
    Math.round(pins.map(
    prevY,
    0,
    1023,
    5,
    0
    )),
    Math.round(pins.map(
    curX,
    0,
    1023,
    0,
    5
    )),
    Math.round(pins.map(
    curY,
    0,
    1023,
    5,
    0
    ))
    ]
    serial.writeNumbers(list)
    led.unplot(list[0], list[1])
    led.plot(list[2], list[3])
}
pins.onPulsed(DigitalPin.P16, PulseValue.Low, function () {
    coloridx = false
})
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    show = 0
    radio.sendValue("draw", 1)
})
let prevX = 0
let prevY = 0
let tmpX = 0
let tmpY = 0
let list: number[] = []
let show = 0
let coloridx = false
radio.setGroup(1)
serial.writeValue("x", 0)
serial.writeNumbers([pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P2)])
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
coloridx = false
basic.forever(function () {
    tmpY = pins.analogReadPin(AnalogPin.P1)
    tmpX = pins.analogReadPin(AnalogPin.P2)
    if (tmpY < prevY - 32 || tmpY >= prevY + 32 || (tmpX < prevX - 32 || tmpX >= prevX + 32)) {
        if (show) {
            radio.sendValue("10000x+y", tmpY * 10000 + tmpX)
        } else {
            radio.sendValue("cursor", tmpY * 10000 + tmpX)
        }
        prevX = tmpY
        prevY = tmpX
    }
})
