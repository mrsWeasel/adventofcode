import re
# This makes absolutely no sense what so ever - too many combinations with 3 operators
# But what is done is done 🙊
def eval_left_to_right(expression, value):
    el = len(expression)
    while el > 0:
        match = re.search('([0-9]+)([+*|]{1})([0-9]+)', expression)
        if (match):
            first = match.group(0)
            copy = first.replace('|', '')
            expression = expression.removeprefix(first)
            expression = str(eval(copy)) + expression
            if eval(expression) > int(value):
                return 0
        else:
            break
    return int(expression)

def tert(num):
    tertiary = ''
    while num > 0:
        quotient, remainder = divmod(num, 3)
        num = quotient
        tertiary = str(remainder) + tertiary
    return tertiary

def do_equation(equation_parts):
    test_value, equation = equation_parts
    counter = 0
    positions = len(equation) - 1
    combinations = 3 ** positions
    equation_str = ''
    found = False
    el = len(equation)

    for i in range(combinations):
        tertiary = tert(i)
        tertiary = tertiary.zfill(positions).replace('0', '+').replace('1', '*').replace('2', '|')

        if found == True:
            break
        for j in range(el):
            equation_str += equation[j]
            if j < len(tertiary):
                equation_str += tertiary[j]
                
        result = eval_left_to_right(equation_str, test_value)
        if (result == int(test_value)):
            counter += result
            found = True
            break
        equation_str = ''
    return counter

def main():
    equations = []

    with open('data.txt') as data:
        for line in data:
            parts = line.split(': ') 
            part1 = parts[0].replace(': ', '')
            part2 = parts[1].strip().split(' ')
            equations.append((part1, part2))

        equation_sum = sum(list(map(do_equation, equations)))
    
        print(equation_sum)
        
main()