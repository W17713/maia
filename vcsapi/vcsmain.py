from flask import Flask,request
import shutil
import os

app = Flask(__name__)

@app.route('/api/v1/filevcs', methods=["GET","POST"])
def filevcs():
    if request.method=="POST":
        content = request.get_json()
        userid =content["userdata"]["userid"]
        topic=content["userdata"]["topic"]
        file = open(userid[16:24]+"_"+topic+".txt","a")
        for i in range(len(content["userdata"]["data"])):
            file.write(content["userdata"]["data"]["key"+str(i+1)]["dat"]+"\n")        
        file.close
        return request.json
    return 'filevcs'


@app.route('/api/v1/add', methods=["POST"])
def mount():
    filename=request.args.get('name')
    cwd = os.getcwd()
    ext='.txt'
    print(format(cwd))
    shutil.move(cwd+'\\files\\'+filename+ext,cwd+'\\staged\\'+filename+ext)
    return 'done'

