from flask import Flask, request, render_template
from flask_cors import CORS
app = Flask(__name__)
app.debug = True
CORS(app)



def editDistance(str1, str2, m , n):
 
    if m==0:
         return n
 
    if n==0:
        return m
 
    if str1[m-1]==str2[n-1]:
        return editDistance(str1,str2,m-1,n-1)
 
    return 1 + min(editDistance(str1, str2, m, n-1),    # Insert
                   editDistance(str1, str2, m-1, n),    # Remove
                   editDistance(str1, str2, m-1, n-1)    # Replace
                   )

@app.route('/api', methods=['POST'])
def hello_world():
	data = request.get_json() or request.form
	firstStr = data['str1']
	secondStr = data['str2']
	firstStrLen = len(firstStr)
	secondStrLen = len(secondStr)
	result = editDistance(firstStr, secondStr, firstStrLen, secondStrLen)
	return str(result)

@app.route('/<string:page_name>/')
def render_static(page_name):
    return render_template('%s.html' % page_name)


if __name__ == '__main__':
  app.run()

