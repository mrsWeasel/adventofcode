equations = []
sum = 0

with open('data.txt') as data:
    for line in data:
        parts = line.split(': ') 
        part1 = parts[0].replace(': ', '')
        part2 = parts[1].strip().split(' ')
        equations.append((part1, part2))

def get_operations(equation):
    operations = []
    positions = len(equation) - 1
    combinations = 2 ** positions

    for i in range(combinations):
        binary = bin(i).replace('0b', '')
        binary = binary.zfill(positions)
        binary = binary.replace('0', '+')
        binary = binary.replace('1', '*')
        operations.append(list(binary))
    return operations

for i in range(len(equations)):
    test_value = equations[i][0]
    values = equations[i][1]
    operations = get_operations(values)
    equation_str = ''
    found = False

    for j in range(len(operations)):
        if found == True:
            break
        for k in range(len(values)):
            if 0 < k < len(operations[j]):
                equation_str = '(' + equation_str
            equation_str += values[k]
            if 0 < k < len(operations[j]):
                equation_str += ')'
            if k < len(operations[j]):
                equation_str += operations[j][k]

        result = eval(equation_str)
        if (result == int(test_value)):
            sum += result
            found = True
            continue

        equation_str = ''

print(sum)
