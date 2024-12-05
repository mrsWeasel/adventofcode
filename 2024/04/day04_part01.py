grid = []
counter = 0

with open("data.txt") as data:
    for line in data:
        line = line.strip()
        grid.append(line)

directions = ['UP', 'UPRIGHT', 'RIGHT', 'DOWNRIGHT', 'DOWN', 'DOWNLEFT', 'LEFT', 'UPLEFT']

def word_from_direction(i, j, direction):
    global counter
    try:
        word = ''
        for _ in range(4):
            if (i < 0 or j < 0):
                raise Exception('Out of range')
            word += grid[i][j]
            if direction == 'UP':
                i = i - 1
            elif direction == 'UPRIGHT':
                i = i - 1
                j = j + 1
            elif direction == 'RIGHT':
                j = j + 1
            elif direction == 'DOWNRIGHT':
                i = i + 1
                j = j + 1
            elif direction == 'DOWN':
                i = i + 1
            elif direction == 'DOWNLEFT':
                i = i + 1
                j = j - 1
            elif direction == 'LEFT':
                j = j - 1
            elif direction == 'UPLEFT':
                i = i - 1
                j = j - 1
        if word == 'XMAS':
            counter += 1
    except:
        pass
   

def find_xmases(i, j):
    if (grid[i][j] != 'X'):
        return 
    
    for k in range(len(directions)):
        word_from_direction(i, j, directions[k])
            
    
for i in range(len(grid)):
    for j in range(len(grid[i])):
        find_xmases(i, j)

print(counter)