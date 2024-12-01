left = []
right = []
diff = 0
similarity = 0

with open("data.txt") as data:
    for line in data:
        left.append(int(line[0:5]))
        right.append(int(line[8:13]))

left.sort()
right.sort()

# Part 1
for i in range(len(left)):
    diff += abs(left[i]-right[i])

print(diff)

# Part 2
for i in range((len(left))):
    similarity += left[i] * right.count(left[i])

print(similarity)