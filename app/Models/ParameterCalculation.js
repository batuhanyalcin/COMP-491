export function calculateDerivative(y, dx) {
    var dydx = Array(y.length)

    // Forward FD for left end node
    dydx[0] = (-y[2] + 4*y[1] - 3*y[0]) / (2 * dx)

    // Central FD for internal nodes
    var i
    for (i = 1; i < y.length - 1; i++) {
      dydx[i] = (y[i+1] - y[i-1]) / (2 * dx)
    }

    // Backward FD for right end node
    dydx[dydx.length - 1] = -(-y[i-2] + 4*y[i-1] - 3*y[i]) / (2 * dx)
    
    return dydx
}

export function calculateIntegral(y, dx) {
    // Integrate using Simpson's 1/3 Rule
    var yI = y[0]

    for (i = 1; i < y.length - 1; i++) {
        yI += (i % 2 == 1 ? 4 * y[i] : 2 * y[i])
    }

    yI += y[y.length - 1]

    yI *= dx / 3
    return yI

}

export function rungeKuttaIntegral(y,dt) {
    // Initialize array
    const yI = new Array(y.length).fill(0)

    for (let i = 1; i < y.length; i++) {
        const k1 = y[i-1];
        const k2 = y[i-1] + 0.5 * k1 * dt;
        const k3 = y[i-1] + 0.5 * k2 *dt;
        const k4 = y[i-1] + k3 * dt;
        
        yI[i] = yI[i-1] + (1 / 6) * (k1 + 2*k2 + 3*k3 + k4) * dt;
    }

    return yI
}

export function calculateLength(x, y) {
    var pathLength = 0;
    for (var i = 1; i < x.length; i++) {
      pathLength += Math.sqrt(
        (x[i] - x[i-1]) ** 2 +
        (y[i] - y[i-1]) ** 2
      )
    }
    return pathLength
}
/*
export function calculatePathLength(accX, accZ, dt) {
    // Integrate acceleration data to calculate velocity
    const velX = rungeKuttaIntegral(accX, dt)
    const velZ = rungeKuttaIntegral(accZ, dt)

    // Integrate again to calculate position
    const x = rungeKuttaIntegral(velX, dt)
    const z = rungeKuttaIntegral(velZ, dt)

    // Calculate path length
    const pathLength = calculateLength(x, z)

    return pathLength
} 
*/
export function calculatePathLength(x, y, dt) {
    return {
        pl: calculateLength(x, y),
        plx: x.reduce((a, b) => Math.abs(a) + Math.abs(b), 0),
        plz: y.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)
    }
}


/*
export function calculateJerk(x, z, dt) {
    // Calculate derivative of x and y
    var jerkX = calculateDerivative(x, dt)
    var jerkZ =  calculateDerivative(z, dt)

    // Take square of jerk
    var jerkX2 = jerkX.map(a => a**2)
    var jerkZ2 = jerkZ.map(a => a**2)

    // Integrate jerk
    var jerkXI = calculateIntegral(jerkX2, dt)
    var jerkZI = calculateIntegral(jerkZ2, dt)

    return (1 / 2) * (jerkXI + jerkZI)

}
*/
export function addVectors(a, b) {
    const res = new Array(a.length).fill(0)

    for (let i = 0; i < res.length; i++) {
        res[i] = a[i] + b[i]
    }
    
    return res
}

export function calculateJerk(x, z, dt) {
    // Calculate derivative of x and y
    const dAccX = calculateDerivative(x, dt)
    const dAccZ =  calculateDerivative(z, dt)

    // Take square of jerk
    const dAccX2 = dAccX.map(a => a**2)
    const dAccZ2 = dAccZ.map(a => a**2)

    // Calculate jerk
    const jerk = (1 / 2) * calculateIntegral(addVectors(dAccX2, dAccZ2), dt)
    const jerkX = (1 / 2) * calculateIntegral(dAccX2, dt)
    const jerkZ = (1 / 2) * calculateIntegral(dAccZ2, dt)

    return {
        jerk: jerk,
        jerkX: jerkX,
        jerkZ: jerkZ
    }

}

export function calculateMeanVelocity(x, z, dt) {
    // Calculate Integral of Acceleration Data
    const velX = rungeKuttaIntegral(x, dt)
    const velZ = rungeKuttaIntegral(z, dt)

    // Calulcate mangitude of velocity
    const vel = new Array(x.length)
    for (let i = 0; i < x.length; i++) {
        vel[i] = Math.sqrt(x[i]**2 + z[i]**2)
    }

    // Calculate mean velocity
    const meanVel = vel.reduce((a, b) => a + b, 0) / vel.length
    return {
        meanVel: meanVel,
        meanVelX: velX.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) / velX.length,
        meanVelZ: velZ.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) / velZ.length
    }

}