function angle_vers_pourcentage (angle: number) {
    p = (angle - ANGLE_MIN) * 100 / (ANGLE_MAX - ANGLE_MIN)
    p = Math.max(0, Math.min(100, p))
    return p
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (etat_pince == 1) {
        radio.sendString("N")
        etat_pince = 0
    } else {
        radio.sendString("G")
        etat_pince = 1
    }
})
function envoyer_angle () {
    radio.sendValue("A", angle_servo)
    afficher_jauge(angle_servo)
}
function afficher_jauge (angle2: number) {
    pourcentage = angle_vers_pourcentage(angle2)
    led.plotBarGraph(
    pourcentage,
    100
    )
}
let pourcentage = 0
let etat_pince = 0
let p = 0
let angle_servo = 0
let ANGLE_MAX = 0
let ANGLE_MIN = 0
radio.setGroup(90)
ANGLE_MIN = 50
ANGLE_MAX = 135
let PAS_ANGLE = 2
angle_servo = 90
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        angle_servo = Math.max(ANGLE_MIN, angle_servo - PAS_ANGLE)
        envoyer_angle()
        basic.pause(20)
    } else if (input.buttonIsPressed(Button.B)) {
        angle_servo = Math.min(ANGLE_MAX, angle_servo + PAS_ANGLE)
        envoyer_angle()
        basic.pause(20)
    }
})
