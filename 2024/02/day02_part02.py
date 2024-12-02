reports = []
counter = 0

def checkReport(report) -> bool:
    increasing = False
    safe = False
    for j in range(len(report)):
        if j == 0:
            continue
        
        number = int(report[j])
        prevNumber = int(report[j-1])

        # set trend based on 2 first items
        if j == 1:
            increasing = number > prevNumber

        # difference must be between 1 and 3
        if abs(number-prevNumber) > 3 or abs(number-prevNumber) < 1:
            break
        
        if (increasing == True) and (prevNumber > number):
            break

        if (increasing == False) and (number > prevNumber):
            break

        if (j == len(report) - 1):    
            safe = True

    return safe


with open("data.txt") as data:
    for line in data:
       reports.append(line.strip().split(' '))

for i in range(len(reports)):
    safe = checkReport(reports[i])
    if safe:
        counter += 1
    else:
        # process the report again with fault tolerance
        for j in range (len(reports[i])):
            reportCopy = reports[i].copy()
            del reportCopy[j]
            safe = checkReport(reportCopy)
            if safe:
                counter += 1
                break

# Part 2
print(counter)
