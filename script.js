document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    document.addEventListener('keyup', control)

    let squares = Array.from(document.querySelectorAll('.grid div'))

    const width = 10

    const startBtn = document.querySelector('#startButton')
    const scoreDisplay = document.querySelector('#score')

    var timerId = null //setInterval(moveDown, 1000)

    let nextRandom = 0
    const displaySquares = Array.from(document.querySelectorAll('.preview div'))
    const displayWidth = 4
    let displayIndex = 0

    let score = 0

    startBtn.addEventListener('click', () => {
        if (timerId)
        {
            clearInterval(timerId)
            timerId = null
            startBtn.innerHTML = "Start/Pause"
        } else
        {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * shapes.length)
            displayNext()
        }
    }) 

    const nextShapes = [
        [1, 2, displayWidth + 1, 2 * displayWidth + 1],
        [displayWidth + 1, displayWidth + 2, 2 * displayWidth, 2 * displayWidth + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, 2 * displayWidth + 1, 3 * displayWidth + 1]
    ]

    const Lshape = [
        [1, 2, width + 1, 2 * width + 1],
        [width, width + 1, width + 2, 2 * width + 2],
        [1, width + 1, 2 * width, 2 * width + 1],
        [width, 2 * width, 2 * width + 1, 2 * width + 2]
    ]

    const Zshape = [
        [width + 1, width + 2, 2 * width, 2 * width + 1],
        [0, width, width + 1, 2 * width + 1],
        [width + 1, width + 2, 2 * width, 2 * width + 1],
        [0, width, width + 1, 2 * width + 1]
    ]

    const Tshape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, 2 * width + 1],
        [width, width + 1, width + 2, 2 * width + 1],
        [1, width, width + 1, 2 * width + 1]
    ]

    const Oshape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const Ishape = [
        [1, width + 1, 2 * width + 1, 3 * width + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, 2 * width + 1, 3 * width + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const shapes = [Lshape, Zshape, Tshape, Oshape, Ishape]

    let currentPosition = 4
    let currentRotation = 0
    let random = Math.floor(Math.random() * shapes.length)
    let currentShape = shapes[random][currentRotation]


    console.log(shapes)

    draw()

    function draw()
    {
        switch (random)
        {
            case 0:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("Lshape")
                })
                break
            
            case 1:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("Zshape")
                })
                break

            case 2:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("Tshape")
                })
                break

            case 3:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("Oshape")
                })
                break

            case 4:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("Ishape")
                })
                break

            default:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("shape")
                })
                break
        }
    }

    function erase()
    {
        switch (random)
        {
            case 0:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("Lshape")
                })
                break
            
            case 1:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("Zshape")
                })
                break

            case 2:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("Tshape")
                })
                break

            case 3:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("Oshape")
                })
                break

            case 4:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("Ishape")
                })
                break

            default:
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.remove("shape")
                })
                break
        }
    }

    function moveDown()
    {
        erase()
        currentPosition += width
        if (currentShape.some(index =>
            squares[currentPosition + index].classList.contains('taken'))) {
                currentPosition -= width
            }
        draw()
        freeze()
    }

    function freeze()
    {
        if(currentShape.some(index =>
            squares[currentPosition + index + width].classList.contains('taken')))
            {
                currentShape.forEach(index => {
                    squares[currentPosition + index].classList.add("taken")
                })

                random = nextRandom
                nextRandom = Math.floor(Math.random() * shapes.length)

                currentShape = shapes[random][currentRotation]
                currentPosition = 4
                draw()
                displayNext()
                displayScore()
                gameOver()
            }
    }

    function moveLeft()
    {
        erase()
        const isLeft = currentShape.some(index => 
            (currentPosition + index) % width === 0)
        if (!isLeft)
        {
            currentPosition -= 1
        }

        if (currentShape.some(index =>
            squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition += 1
        }
        draw()
    }

    function moveRight()
    {
        erase()
        const isRight = currentShape.some(index => 
            (currentPosition + index + 1) % width === 0)
        if (!isRight)
        {
            currentPosition += 1
        }

        if (currentShape.some(index =>
            squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition -= 1
        }
        draw()
    }

    function rotate()
    {
        erase()
        let lastRotation = currentRotation
        currentRotation++

        if(currentRotation >= currentShape.length)
        {
            currentRotation = 0
        }

        currentShape = shapes[random][currentRotation]

        if (currentShape.some(index => (currentPosition + index) % width === 0) &&
        currentShape.some(index => (currentPosition + index) % width === width - 1)) {
            currentRotation = lastRotation
            currentShape = shapes[random][currentRotation]
        }
        draw()
    }

    function control(e)
    {
        if(e.keyCode === 37) //left arrow
        {
            moveLeft()
        }

        else if(e.keyCode === 39) //right arrow
        {
            moveRight()
        }

        else if(e.keyCode === 40) //down arrow
        {
            moveDown()
        }

        else if(e.keyCode === 38) //arrow up
        {
            rotate()
        }
    }

    function displayNext()
    {
        switch (random)
        {
            case 0:
                displaySquares.forEach(index => {
                    index.classList.remove("Lshape")
                })
                break
            
            case 1:
                displaySquares.forEach(index => {
                    index.classList.remove("Zshape")
                })
                break

            case 2:
                displaySquares.forEach(index => {
                    index.classList.remove("Tshape")
                })
                break

            case 3:
                displaySquares.forEach(index => {
                    index.classList.remove("Oshape")
                })
                break

            case 4:
                displaySquares.forEach(index => {
                    index.classList.remove("Ishape")
                })
                break

            default:
                displaySquares.forEach(index => {
                    index.classList.remove("shape")
                })
                break
        }

        switch (nextRandom)
        {
            case 0:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("Lshape")
                })
                break
            
            case 1:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("Zshape")
                })
                break

            case 2:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("Tshape")
                })
                break

            case 3:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("Oshape")
                })
                break

            case 4:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("Ishape")
                })
                break

            default:
                nextShapes[nextRandom].forEach(index => {
                    displaySquares[displayIndex + index].classList.add("shape")
                })
                break
        }
    }

    function displayScore()
    {
        for (let i = 0; i < 199; i += width)
        {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(index => squares[index].classList.contains('taken')))
            {
                score += 10;
                scoreDisplay.innerHTML = score;

                row.forEach(index => {squares[index].classList.remove('taken')})
                row.forEach(index => {squares[index].classList.remove("Lshape")})
                row.forEach(index => {squares[index].classList.remove("Zshape")})
                row.forEach(index => {squares[index].classList.remove("Tshape")})
                row.forEach(index => {squares[index].classList.remove("Oshape")})
                row.forEach(index => {squares[index].classList.remove("Ishape")})
                row.forEach(index => {squares[index].classList.remove('shape')})
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(sq => grid.appendChild(sq))
            }
        }
    }

    function gameOver()
    {
        if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            scoreDisplay.innerHTML = "Game Over"
            startBtn.innerHTML = "Restart"
            clearInterval(timeId)
        }
    }

    //summer homework: make the snake game in javascript
})

// Author: Iliyan Teofilov