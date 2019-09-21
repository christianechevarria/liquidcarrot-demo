let Bird = function(brain) {
  // position and size of bird
  this.x = 64
  this.y = 512 / 2
  this.r = 12

  this.brain = brain
  this.brain.score = 0
  this.birdImage = new Image()
  this.birdImage.src = "img/bird.png"

  // Physics
  this.gravity = 0.8
  this.lift = -12
  this.velocity = 0

  this.score = 0 // Score is how many frames it's been alive

  this.draw = () => ctx.drawImage(this.birdImage,  this.x, this.y, this.r * 2, this.r * 2)

  // This is the key function now that decides
  // if it should jump or not jump!
  this.act = function(pipes) {
    let inputs = [0, 0, 0, 0, 0]
    if(Array.isArray(pipes) && pipes.length) {
      const closest = pipes[0] // closest pipe is always first

      inputs[0] = map(closest.x, this.x, 450, 0, 1) // x position of closest pipe
      inputs[1] = map(closest.top, 0, 512, 0, 1) // top of closest pipe opening
      inputs[2] = map(closest.bottom, 0, 512, 0, 1) // bottom of closest pipe opening
      inputs[3] = map(this.y, 0, 512, 0, 1) // bird's y position
      inputs[4] = map(this.velocity, -5, 5, 0, 1) // bird's y velocity
    }

    let action = this.brain.activate(inputs) // Get the outputs from the network
    if (action[1] > action[0]) this.jump()
  }

  this.jump = () => this.velocity += this.lift

  // Bird dies when hits edges of screen
  this.offscreen = () => this.y > 512 || this.y < 0

  // Update bird's position based on velocity, gravity, etc.
  this.update = function(){
    this.velocity += this.gravity
    this.y += this.velocity

    this.brain.score++ // increase brain's score for each frame
  }

  // this.score / this.brain.nodes.length * this.brain.connections.length * (.00000000001 * neat.generation);

  return this;
}
