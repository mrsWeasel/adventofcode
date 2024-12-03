import re

instructions = []
sum = 0

with open("data.txt") as data:
    for line in data:
       instructions += (re.findall("mul\([0-9]{1,3},[0-9]{1,3}\)", line))

for i in range(len(instructions)):
    instruction = instructions[i].replace("mul(", "").replace(")", "").split(",")
    sum += int(instruction[0]) * int(instruction[1])

print(sum)