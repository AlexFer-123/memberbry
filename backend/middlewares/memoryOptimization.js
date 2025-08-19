// Memory optimization middleware
const memoryOptimization = (req, res, next) => {
    // Set response headers to optimize memory usage
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    })
    
    // Clean up response after sending
    const originalSend = res.send
    res.send = function(data) {
        originalSend.call(this, data)
        // Force garbage collection hint
        if (global.gc) {
            setImmediate(() => global.gc())
        }
    }
    
    next()
}

// Memory monitoring middleware
const memoryMonitor = (req, res, next) => {
    const memUsage = process.memoryUsage()
    const mbUsed = Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100
    
    // Log memory usage if it's getting high
    if (mbUsed > 200) {
        console.warn(`⚠️  High memory usage: ${mbUsed}MB`)
        
        // Force garbage collection if available
        if (global.gc && mbUsed > 300) {
            global.gc()
            console.log('🗑️  Forced garbage collection')
        }
    }
    
    // Add memory info to response headers in development
    if (process.env.NODE_ENV !== 'production') {
        res.set('X-Memory-Usage', `${mbUsed}MB`)
    }
    
    next()
}

export { memoryOptimization, memoryMonitor };
