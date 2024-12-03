import re

instructions = []
sum = 0
multiplying = True

with open("data.txt") as data:
    for line in data:
       matches = (re.findall("(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don\'t\(\))", line))
       for match in matches:
           for instruction in match:
               instruction = instruction.strip()
               if len(instruction) == 0:
                   continue
               instructions.append(instruction)

for i in range(len(instructions)):
    if instructions[i] == "do()":
        multiplying = True
    elif instructions[i] == "don't()":
        multiplying = False
    elif multiplying == True:
        instruction = instructions[i].replace("mul(", "").replace(")", "").split(",")
        sum += int(instruction[0]) * int(instruction[1])

print(sum)