grid = []
counter = 0

with open("data.txt") as data:
    for line in data:
        line = line.strip()
        grid.append(line)

def find_xmases(i, j):
    global counter
    if (grid[i][j] != 'A'):
        return 
    
    try:
        center = grid[i][j]
        up_left = grid[i-1][j-1]
        down_left = grid[i+1][j-1]
        up_right = grid[i-1][j+1]
        down_right = grid[i+1][j+1]

        diag_1 = up_left + center + down_right
        diag_2 = up_right + center + down_left

        if diag_1 != 'MAS' and diag_1[::-1] != 'MAS':
            return
        if diag_2 != 'MAS' and diag_2[::-1] != 'MAS':
            return
        counter += 1
    except:
        pass    
    
for i in range(len(grid)):
    for j in range(len(grid[i])):
        find_xmases(i, j)

print(counter)