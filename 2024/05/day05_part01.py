import re

def read_data():
    with open('data.txt', 'r') as data:
        text = re.split('\n\n', data.read())
    return text

def get_middle_page(pages):
    return int(pages[len(pages)//2])

def main():
    text = read_data()
    rules = [tuple(x.split('|')) for x in text[0].split('\n')]
    pages = [x.split(',') for x in text[1].split('\n')]

    for i in range(len(rules)):   
        left, right = rules[i]
        ok_pages = []
        
        for j in range(len(pages)):
            page = pages[j]
            # rule does not apply
            if (left not in page) or (right not in page):
                ok_pages.append(page)
            # correct order
            elif page.index(right) > page.index(left):
                ok_pages.append(page)
        
        pages = ok_pages
    
    counter = sum(list(map(get_middle_page, pages)))
    print(counter)
  
main()