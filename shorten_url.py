# Ensure pyshorteners is installed
# pip3 install pyshorteners
# Usage: python3 demo.py URL [shortener_name]
# Shorteners list: ['chilpit', 'clckru', 'dagd', 'isgd', 'nullpointer', 'osdb', 'tinyurl']

import pyshorteners, sys


def main():
    l = len(sys.argv)
    if l<2 or l>3:
        print("Incorrect number of arguments!\n"
              "Usage: python3 demo.py URL [shortener_name]")
        exit(0)

    url = sys.argv[1]
    shortener = ""
    shorteners_list = ['chilpit', 'clckru', 'dagd', 'isgd', 'nullpointer', 'osdb', 'tinyurl']

    if l == 3:
        if sys.argv[2] in shorteners_list:
            print("Shortener entered: ", shortener)
            shortener = sys.argv[2]
        else:
            print("Shortener should be one of the following:")
            print(shorteners_list)

    print("URL to be shortened:", url)
    if shortener == "":
        shortener = "tinyurl"
        print("Default shortener:", shortener)
    else:
        print("Shortener to be used: ", shortener)

    print("Shortened URL:",shorten(url, str(shortener)))



def shorten(url, shortener):
    s = pyshorteners.Shortener()
    try:
        if shortener == "chilpit":
            return(s.chilpit.short(url))

        elif shortener == "clckru":
            return(s.clckru.short(url))

        elif shortener == "dagd":
            return(s.dagd.short(url))

        elif shortener == "isgd":
            return(s.isgd.short(url))

        elif shortener == "nullpointer":
            return(s.nullpointer.short(url))

        elif shortener == "osdb":
            return(s.osdb.short(url))

        else:
            return(s.tinyurl.short(url))
    except:
        print("Something went wrong! Exception raised: " + sys.exc_info()[0].__name__)
        exit(1)






if __name__ == "__main__":
   main()