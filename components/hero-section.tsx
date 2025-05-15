"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"

// Dynamically import p5 with no SSR to avoid server-side rendering issues
const P5 = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
})

export function HeroSection() {
  const tableRef = useRef(null)
  const handlesRef = useRef([])
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)
  const leftGoggleRef = useRef(0)
  const rightGoggleRef = useRef(0)
  const vHairRef = useRef([])
  const hairCRef = useRef(null)
  const psRef = useRef([])
  const vnsRef = useRef([])
  const hairstyleRef = useRef(0)
  const shadowPosRef = useRef([])
  const pgRef = useRef(null)
  const leftCRef = useRef([])
  const rightCRef = useRef([])
  const pointCtRef = useRef(0)
  const sliderRef = useRef(null)

  const containerRef = useRef(null)
  const scaleFactorRef = useRef(1)
  const canvasWidthRef = useRef(400)
  const canvasHeightRef = useRef(400)

  // Constants
  const facePt = 5
  const eyePt = 5
  const step = 0.01
  const defaultThickness = 4
  const dropShadow = true

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR297digAQzBVZ3MJkIi2tiEJboBPboFRBxSL3D6uKMmivKWSyYd1cyCkgyZNLIBV5j3Sh3FkRevrdn/pub?gid=0&single=true&output=csv"

  const preload = (p5) => {
    tableRef.current = p5.loadTable(url, "csv", "header")
  }

  const setup = (p5, canvasParentRef) => {
    p5.frameRate(30)
    leftCRef.current = [p5.random(0, 20), p5.random(176, 196), p5.random(0, 191)]
    rightCRef.current = [p5.random(0, 200), p5.random(176, 196), p5.random(171, 191)]
    sliderRef.current = { value: defaultThickness } // Simplified slider
    p5.noFill()
    p5.angleMode(p5.DEGREES)

    // Get container width
    if (containerRef.current) {
      canvasWidthRef.current = containerRef.current.clientWidth - 48 // Subtract padding (24px on each side)
      canvasHeightRef.current = canvasWidthRef.current // Keep aspect ratio 1:1
      scaleFactorRef.current = canvasWidthRef.current / 400 // Calculate scale factor based on original 400px width
    }

    const canvas = p5.createCanvas(canvasWidthRef.current, canvasHeightRef.current).parent(canvasParentRef)

    updatePoints(p5)

    p5.background(255)
    for (let i = 0; i < handlesRef.current.length - 1; i++) {
      drawBezier(p5, handlesRef.current[i].returnHead(), handlesRef.current[i + 1].returnTail())
    }
  }

  const draw = (p5) => {
    pointCtRef.current = 0
    const s = scaleFactorRef.current

    p5.background(255)

    p5.push()
    p5.fill(217, 169, 41) // shadow
    p5.noStroke()
    p5.pop()

    p5.fill(leftCRef.current) // glass

    leftLookAt(p5)
    rightLookAt(p5)
    pgRef.current = p5.createGraphics(canvasWidthRef.current, canvasHeightRef.current)
    pgRef.current.rotate(-0.1)
    pgRef.current.fill(145, 110, 17)
    pgRef.current.noStroke()
    pgRef.current.beginShape()
    p5.vertex(handlesRef.current[0].x1, handlesRef.current[0].y1)
    for (let i = 0; i < facePt; i++) {
      p5.bezierVertex(
        handlesRef.current[i].x2,
        handlesRef.current[i].y2,
        handlesRef.current[i + 1].x3,
        handlesRef.current[i + 1].y3,
        handlesRef.current[i + 1].x1,
        handlesRef.current[i + 1].y1,
      )
    }
    pgRef.current.endShape()

    if (dropShadow) p5.image(pgRef.current, -10 * s, 180 * s, canvasWidthRef.current, canvasHeightRef.current / 2)
    p5.push()
    p5.fill(240, 237, 211) // Face Color Here
    p5.noStroke()
    p5.beginShape()
    p5.vertex(handlesRef.current[0].x1, handlesRef.current[0].y1)
    for (let i = 0; i < facePt; i++) {
      p5.bezierVertex(
        handlesRef.current[i].x2,
        handlesRef.current[i].y2,
        handlesRef.current[i + 1].x3,
        handlesRef.current[i + 1].y3,
        handlesRef.current[i + 1].x1,
        handlesRef.current[i + 1].y1,
      )
    }
    p5.endShape()

    drawShadow(p5)
    p5.pop()
    p5.circle(handlesRef.current[5].x1, handlesRef.current[5].y1, leftGoggleRef.current * s)
    p5.fill(rightCRef.current)
    p5.circle(handlesRef.current[10].x1, handlesRef.current[10].y1, rightGoggleRef.current * s)

    for (let i = 0; i < handlesRef.current.length - 1; i++) {
      drawBezier(p5, handlesRef.current[i].returnHead(), handlesRef.current[i + 1].returnTail())
    }
    drawHair(p5)
    drawMouth(p5)
  }

  const mousePressed = (p5) => {
    if (p5.mouseX < canvasWidthRef.current && p5.mouseY < canvasHeightRef.current) {
      reFresh(p5)
    }
  }

  const windowResized = (p5) => {
    if (containerRef.current) {
      canvasWidthRef.current = containerRef.current.clientWidth - 48 // Subtract padding
      canvasHeightRef.current = canvasWidthRef.current // Keep aspect ratio 1:1
      scaleFactorRef.current = canvasWidthRef.current / 400 // Recalculate scale factor
      p5.resizeCanvas(canvasWidthRef.current, canvasHeightRef.current)
      p5.redraw()
    }
  }

  // Helper functions
  const updatePoints = (p5) => {
    const s = scaleFactorRef.current
    hairCRef.current = p5.color(p5.random(180, 220), p5.random(180, 220), p5.random(180, 220))
    p5.strokeWeight(0)
    leftGoggleRef.current = p5.random(50, 80) * s
    rightGoggleRef.current = p5.random(50, 80) * s

    handlesRef.current = []
    iniFaceOutlineHd(p5)
    iniLeftEyeHd(p5)
    iniRightEyeHd(p5)
    iniNose(p5)
    iniMouth(p5)
    const handle4 = new Handle(
      p5,
      handlesRef.current[0].x1 + p5.random(15) * s,
      handlesRef.current[0].y1 - p5.random(15) * s,
      handlesRef.current[4].zeroAngle,
      handlesRef.current[4].distance * s,
    )
    handlesRef.current[4] = handle4
  }

  const iniFaceOutlineHd = (p5) => {
    for (let i = 0; i < facePt; i++) {
      iniHandle1(p5, i)
    }
  }

  const iniHandle1 = (p5, i) => {
    const s = scaleFactorRef.current
    const x1 = p5.random(checkTableInt(p5, i, 1), checkTableInt(p5, i, 2)) * s
    const y1 = p5.random(checkTableInt(p5, i, 3), checkTableInt(p5, i, 4)) * s

    const handle1 = new Handle(p5, x1, y1, checkTableInt(p5, i, 0), 50 * s)
    handlesRef.current.push(handle1)
  }

  const iniLeftEyeHd = (p5) => {
    const yMin = p5.lerp(handlesRef.current[3].y1, handlesRef.current[1].y1, 0.35)
    const yMax = p5.lerp(handlesRef.current[3].y1, handlesRef.current[1].y1, 0.45)
    const xMin = p5.lerp(handlesRef.current[0].x1, handlesRef.current[2].x1, 0.3)
    const xMax = p5.lerp(handlesRef.current[0].x1, handlesRef.current[2].x1, 0.2)

    const center = p5.createVector(p5.random(xMin, xMax), p5.random(yMin, yMax))
    leftEyeRef.current = center
    for (let i = 0; i < eyePt; i++) {
      const handle1 = new Handle(
        p5,
        center.x,
        center.y + Math.pow(-1, i) * i * 10,
        checkTableInt(p5, i + facePt, 0),
        15 + i * 5,
      )
      handlesRef.current.push(handle1)
    }
    const handle1 = new Handle(p5, center.x + 30, center.y, checkTableInt(p5, eyePt + facePt, 0), 25)
    handlesRef.current.push(handle1)
  }

  const iniRightEyeHd = (p5) => {
    const yMin = p5.lerp(handlesRef.current[3].y1, handlesRef.current[1].y1, 0.35)
    const yMax = p5.lerp(handlesRef.current[3].y1, handlesRef.current[1].y1, 0.45)
    const xMin = p5.lerp(handlesRef.current[0].x1, handlesRef.current[2].x1, 0.7)
    const xMax = p5.lerp(handlesRef.current[0].x1, handlesRef.current[2].x1, 0.8)

    const center = p5.createVector(p5.random(xMin, xMax), p5.random(yMin, yMax))
    rightEyeRef.current = center
    for (let i = 0; i < eyePt - 1; i++) {
      const handle1 = new Handle(
        p5,
        center.x,
        center.y + Math.pow(-1, i) * i * 10,
        checkTableInt(p5, i + 1 + eyePt + facePt, 0),
        15 + i * 5,
      )
      handlesRef.current.push(handle1)
    }
    const handle1 = new Handle(
      p5,
      p5.lerp(center.x, handlesRef.current[5].x1, 0.5),
      center.y,
      checkTableInt(p5, eyePt + eyePt + facePt, 0),
      25,
    )
    handlesRef.current.push(handle1)
  }

  const iniNose = (p5) => {
    const handle1 = handlesRef.current[facePt + eyePt * 2]
    const x = handle1.x1 + p5.random(0, 40)
    const y = handle1.y1 + p5.random(60, 75)
    const handle2 = new Handle(p5, x, y, 90 + p5.random(-5, 65), p5.random(60, 80))
    const x2 = (handle2.x1 + handle2.x2) / 2
    const y2 = handle2.y2 + 10
    const handle3 = new Handle(p5, x2, y2, 180 + p5.random(-5, 65), p5.random(35, 55))
    handlesRef.current.push(handle2)
    handlesRef.current.push(handle3)
  }

  const iniMouth = (p5) => {
    let handle1 = handlesRef.current[handlesRef.current.length - 1]
    const x = handle1.x1
    handle1 = handlesRef.current[handlesRef.current.length - 2]
    const y = handle1.y1 + 55

    const handle2 = new Handle(p5, x, y, 270 + p5.random(-5, 65), p5.random(35, 55))
    handlesRef.current.push(handle2)
    handle2.x1 -= 50
    handlesRef.current.push(handle2)
  }

  const drawHair = (p5) => {
    vHairRef.current = []
    psRef.current = []
    vnsRef.current = []

    getHairPos(p5, handlesRef.current[2].returnHead(), handlesRef.current[3].returnTail(), 0.5)
    getHairPos(p5, handlesRef.current[3].returnHead(), handlesRef.current[4].returnTail(), 0)

    p5.push()
    p5.strokeWeight(6)
    for (let i = 0; i < psRef.current.length; i++) {
      if (i > 0 && i < psRef.current.length - 1) {
        psRef.current[i].add(
          vnsRef.current[i]
            .rotate(100 + 30 * Math.abs(p5.sin(p5.millis())))
            .mult(p5.noise(i / 20 + hairstyleRef.current) * 100),
        )
      }
      vHairRef.current.push(psRef.current[i])
    }
    p5.pop()

    p5.push()
    p5.strokeWeight(sliderRef.current.value / 1.5)
    p5.fill(hairCRef.current)
    p5.beginShape()
    for (let i = 0; i < vHairRef.current.length; i++) {
      p5.vertex(vHairRef.current[i].x, vHairRef.current[i].y)
    }

    p5.bezierVertex(
      p5.lerp(vHairRef.current[vHairRef.current.length - 1].x, vHairRef.current[0].x, 0.25),
      p5.lerp(vHairRef.current[vHairRef.current.length - 1].y, vHairRef.current[0].y, 0.25) + 15,
      p5.lerp(vHairRef.current[vHairRef.current.length - 1].x, vHairRef.current[0].x, 0.75),
      p5.lerp(vHairRef.current[vHairRef.current.length - 1].y, vHairRef.current[0].y, 0.75) + 15,
      vHairRef.current[0].x,
      vHairRef.current[0].y,
    )

    p5.endShape()
    p5.pop()
  }

  const getHairPos = (p5, h1, h2, start) => {
    p5.strokeWeight(2)
    const x1 = h1[0]
    const y1 = h1[1]
    const x2 = h1[2]
    const y2 = h1[3]
    const x3 = h2[0]
    const y3 = h2[1]
    const x4 = h2[2]
    const y4 = h2[3]

    for (let t = start; t < start + 0.5; t += step) {
      const x21 = p5.lerp(x1, x2, t)
      const x22 = p5.lerp(x2, x3, t)
      const x23 = p5.lerp(x3, x4, t)
      const y21 = p5.lerp(y1, y2, t)
      const y22 = p5.lerp(y2, y3, t)
      const y23 = p5.lerp(y3, y4, t)

      const x31 = p5.lerp(x21, x22, t)
      const x32 = p5.lerp(x22, x23, t)
      const y31 = p5.lerp(y21, y22, t)
      const y32 = p5.lerp(y22, y23, t)

      const x41 = p5.lerp(x31, x32, t)
      const y41 = p5.lerp(y31, y32, t)

      const v = p5.createVector(x32 - x31, y32 - y31)
      v.normalize()
      const vn = p5.createVector(-v.y, v.x)
      vnsRef.current.push(v)
      const point = p5.createVector(x41, y41)
      psRef.current.push(point)
    }
  }

  const drawMouth = (p5) => {
    const handle1 = handlesRef.current[handlesRef.current.length - 1]
    const handle2 = handlesRef.current[handlesRef.current.length - 2]

    p5.push()
    p5.fill(255, 0, 110)
    p5.beginShape()
    p5.vertex(handle1.x1, handle1.y1)
    p5.bezierVertex(handle1.x2, handle1.y2, handle2.x3, handle2.y3, handle2.x1, handle2.y1)
    p5.endShape()
    p5.pop()
  }

  const drawShadow = (p5) => {
    shadowPosRef.current = []
    drawShape(p5, handlesRef.current[1].returnHead(), handlesRef.current[2].returnTail(), 0.2, 1)
    drawShape(p5, handlesRef.current[2].returnHead(), handlesRef.current[3].returnTail(), 0, 1)

    p5.push()
    p5.strokeWeight(0)
    p5.fill(191, 184, 145, 150)
    p5.beginShape()
    for (let i = 0; i < shadowPosRef.current.length; i++) {
      p5.vertex(shadowPosRef.current[i].x, shadowPosRef.current[i].y)
    }

    p5.bezierVertex(
      Math.max(shadowPosRef.current[shadowPosRef.current.length - 1].x, shadowPosRef.current[0].x) + 100,
      p5.lerp(shadowPosRef.current[shadowPosRef.current.length - 1].y, shadowPosRef.current[0].y, 0.25),
      Math.max(shadowPosRef.current[shadowPosRef.current.length - 1].x, shadowPosRef.current[0].x) + 80,
      p5.lerp(shadowPosRef.current[shadowPosRef.current.length - 1].y, shadowPosRef.current[0].y, 0.75),
      shadowPosRef.current[0].x,
      shadowPosRef.current[0].y,
    )

    p5.endShape()
    p5.pop()
  }

  const drawShape = (p5, h1, h2, start, end) => {
    p5.strokeWeight(2)
    const x1 = h1[0]
    const y1 = h1[1]
    const x2 = h1[2]
    const y2 = h1[3]
    const x3 = h2[0]
    const y3 = h2[1]
    const x4 = h2[2]
    const y4 = h2[3]

    for (let t = start; t < end; t += step) {
      const x21 = p5.lerp(x1, x2, t)
      const x22 = p5.lerp(x2, x3, t)
      const x23 = p5.lerp(x3, x4, t)
      const y21 = p5.lerp(y1, y2, t)
      const y22 = p5.lerp(y2, y3, t)
      const y23 = p5.lerp(y3, y4, t)

      const x31 = p5.lerp(x21, x22, t)
      const x32 = p5.lerp(x22, x23, t)
      const y31 = p5.lerp(y21, y22, t)
      const y32 = p5.lerp(y22, y23, t)

      const x41 = p5.lerp(x31, x32, t)
      const y41 = p5.lerp(y31, y32, t)

      const point = p5.createVector(x41, y41)
      shadowPosRef.current.push(point)
    }
  }

  const drawBezier = (p5, h1, h2) => {
    p5.strokeWeight(2)
    const x1 = h1[0]
    const y1 = h1[1]
    const x2 = h1[2]
    const y2 = h1[3]
    const x3 = h2[0]
    const y3 = h2[1]
    const x4 = h2[2]
    const y4 = h2[3]

    for (let t = 0; t < 1; t += step) {
      const x21 = p5.lerp(x1, x2, t)
      const x22 = p5.lerp(x2, x3, t)
      const x23 = p5.lerp(x3, x4, t)
      const y21 = p5.lerp(y1, y2, t)
      const y22 = p5.lerp(y2, y3, t)
      const y23 = p5.lerp(y3, y4, t)

      const x31 = p5.lerp(x21, x22, t)
      const x32 = p5.lerp(x22, x23, t)
      const y31 = p5.lerp(y21, y22, t)
      const y32 = p5.lerp(y22, y23, t)

      const x41 = p5.lerp(x31, x32, t)
      const y41 = p5.lerp(y31, y32, t)
      const v = p5.createVector(x32 - x31, y32 - y31)

      v.normalize()
      const vn = p5.createVector(-v.y, v.x)
      const point = p5.createVector(x41, y41)

      p5.strokeWeight(sliderRef.current.value / 2 + p5.noise(-p5.millis() / 120 + pointCtRef.current / 8) * 4)
      point.add(vn.mult(sliderRef.current.value + p5.noise(p5.millis() / 150 + pointCtRef.current / 8) * 4))
      p5.point(point.x, point.y)

      pointCtRef.current++
    }
  }

  const leftLookAt = (p5) => {
    const er = 15
    let x = p5.map(
      p5.mouseX,
      leftEyeRef.current.x - 200,
      leftEyeRef.current.x + 200,
      leftEyeRef.current.x - er,
      leftEyeRef.current.x + er,
    )
    let y = p5.map(
      p5.mouseY,
      leftEyeRef.current.y - 200,
      leftEyeRef.current.y + 200,
      leftEyeRef.current.y - er,
      leftEyeRef.current.y + er,
    )

    x = Math.max(Math.min(leftEyeRef.current.x + er, x), leftEyeRef.current.x - er)
    y = Math.max(Math.min(leftEyeRef.current.y + er, y), leftEyeRef.current.y - er)

    handlesRef.current[5].x1 = x
    handlesRef.current[5].y1 = y
    const v = p5.createVector(x - leftEyeRef.current.x, y - leftEyeRef.current.y)
    for (let i = 0; i < eyePt; i++) {
      handlesRef.current[facePt + i].x1 = x
      handlesRef.current[facePt + i].y1 = y + Math.pow(-1, i) * i * 10
    }
    handlesRef.current[5].updatePos(v)
  }

  const rightLookAt = (p5) => {
    const er = 15
    let x = p5.map(
      p5.mouseX,
      rightEyeRef.current.x - 200,
      rightEyeRef.current.x + 200,
      rightEyeRef.current.x - er,
      rightEyeRef.current.x + er,
    )
    let y = p5.map(
      p5.mouseY,
      rightEyeRef.current.y - 200,
      rightEyeRef.current.y + 200,
      rightEyeRef.current.y - er,
      rightEyeRef.current.y + er,
    )

    x = Math.max(Math.min(rightEyeRef.current.x + er, x), rightEyeRef.current.x - er)
    y = Math.max(Math.min(rightEyeRef.current.y + er, y), rightEyeRef.current.y - er)

    handlesRef.current[10].x1 = x
    handlesRef.current[10].y1 = y
    const v = p5.createVector(x - rightEyeRef.current.x, y - rightEyeRef.current.y)
    for (let i = 0; i < eyePt - 1; i++) {
      handlesRef.current[facePt + eyePt + 1 + i].x1 = x
      handlesRef.current[facePt + eyePt + 1 + i].y1 = y + Math.pow(-1, i) * i * 10
    }
    handlesRef.current[10].updatePos(v)
  }

  const checkTableInt = (p5, x, y) => {
    return Number.parseInt(tableRef.current.getString(x, y))
  }

  const reFresh = (p5) => {
    p5.clear()
    updatePoints(p5)
    hairstyleRef.current++
    leftCRef.current = [p5.random(0, 200), p5.random(176, 196), p5.random(0, 191)]
    rightCRef.current = [p5.random(0, 200), p5.random(0, 196), p5.random(171, 191)]
    p5.draw()
  }

  // Handle class
  class Handle {
    constructor(p5, x1, y1, angle, distance) {
      const s = scaleFactorRef.current
      this.x1 = x1
      this.y1 = y1
      this.zeroAngle = angle
      this.angle = angle + p5.random(-10, 10)
      this.distance = distance
      this.x2 = x1 + p5.sin(this.angle) * this.distance
      this.y2 = y1 + p5.cos(this.angle) * this.distance
      this.x3 = x1 - this.x2 + x1
      this.y3 = y1 - this.y2 + y1
    }

    returnHead() {
      return [this.x1, this.y1, this.x2, this.y2]
    }

    returnTail() {
      return [this.x3, this.y3, this.x1, this.y1]
    }

    updatePos(v) {
      this.x2 = this.x1 + v.x * 1.5
      this.y2 = this.y1 + v.y * 1.5
      this.x3 = this.x1 - this.x2 + this.x1
      this.y3 = this.y1 - this.y2 + this.y1
    }
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border border-black p-6" ref={containerRef}>
        {typeof window !== "undefined" && (
          <P5
            preload={preload}
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            windowResized={windowResized}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 border border-black rounded-full flex items-center justify-center">
            <span>i</span>
          </div>
          <p className="font-mono">Ugly Face Generator</p>
        </div>
        <div className="flex gap-4 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="w-8 h-8 border border-black flex items-center justify-center">
              {num}
            </div>
          ))}
        </div>
        <p className="font-mono text-sm mb-4">Click on the face to generate a new one!</p>
        <p className="font-mono">
          This portfolio showcases skills, projects, and experience in a simple, easy-to-assemble format. Follow the
          instructions carefully.
        </p>
      </div>
    </div>
  )
}
