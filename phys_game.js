
let engine = Matter.Engine.create();

const width = 1280, height = 720;


let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: width,
        height: height,
        wireframes: false
    }
});

let mouse = Matter.Mouse.create();
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: false},
    },
});

let platform = Matter.Bodies.rectangle(700, 300, 300, 20, { isStatic: true });
let stack = Matter.Composites.stack(550, 200, 5, 5, 0, 0, (x, y) => Matter.Bodies.polygon(x, y, 8, 30));

let ground = Matter.Bodies.rectangle(400,600,810,60,{ isStatic: true});

let ball = Matter.Bodies.circle(200, 200, 20);
let constraint = Matter.Constraint.create({
    pointA: {x: 200, y: 200},
    bodyB: ball,
    stiffness: 0.05    
})

let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', (e) => {
    if (e.body == ball) firing = true;
})

Matter.Events.on(engine, 'afterUpdate', () => {
    if (firing && Math.abs(ball.position.x-200) < 20 && Math.abs(ball.position.y-200) < 20){
        ball = Matter.Bodies.circle(200, 200, 20);
        Matter.World.add(engine.world, ball);
        constraint.bodyB = ball;
        firing = false
    }
})

Matter.World.add(engine.world, [ground, stack, platform, ball, constraint, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);