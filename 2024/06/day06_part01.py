grid = []
directions = ['up', 'right', 'down', 'left']

with open("data.txt") as data:
    for line in data:
        line = line.strip()
        grid.append(list(line))

def get_starting_position():
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] == '^':
                return (y, x)
            
def get_next_direction(direction):
    if directions[-1] == direction:
        index = 0
    else:
        index = directions.index(direction) + 1
    return directions[index]

def guard():
    counter = 0
    guarding = True
    direction = 'up'
    start = get_starting_position()
    y = start[0]
    x = start[1]
    nextY = y
    nextX = x
    
    try:
        while (guarding):      
            # find next location
            if direction == 'up':
                nextX = x
                nextY = y - 1
            elif direction == 'right':
                nextX = x + 1
                nextY = y
            elif direction == 'down':
                nextX = x
                nextY = y + 1
            elif direction == 'left':
                nextX = x - 1
                nextY = y
            # mark visited
            if grid[y][x] != 'X':
                counter += 1
                grid[y][x] = 'X'
            # obstacle
            if grid[nextY][nextX] == '#':
                direction = get_next_direction(direction)
                continue
            y = nextY
            x = nextX
    except:
        guarding = False
        print(counter)

guard()